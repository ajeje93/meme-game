import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { nanoid } from "nanoid";
import {
  createNewClient,
  updateAllClients,
  getRoomData,
  createNewRoom,
} from "./utils/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });
const app = express();
const PORT = process.env.PORT || 3001;
let rooms = {};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Service listening at http://localhost:${PORT}`);
});

app.get("/events", async (req, res) => {
  try {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    });

    rooms[req.query.roomId] =
      rooms[req.query.roomId] || (await createNewRoom());

    const currentClientIdx = rooms[req.query.roomId].clients.findIndex(
      (client) => client.id === req.query.clientId
    );

    // If client is not in room, add them
    if (currentClientIdx === -1) {
      rooms[req.query.roomId].clients.push({
        ...createNewClient(req.query.clientId, req.query.clientName),
        res,
      });
      updateAllClients(rooms, req.query.roomId);
    } else {
      // If client is in room, update their res
      rooms[req.query.roomId].clients[currentClientIdx] = {
        ...rooms[req.query.roomId].clients[currentClientIdx],
        res,
      };
    }

    res.write(
      `data: ${JSON.stringify(getRoomData(rooms, req.query.roomId))}\n\n`
    );

    // Send ping to client every 5 seconds to keep connection alive
    const intervalId = setInterval(() => {
      try {
        res.write(
          `data: ${JSON.stringify({
            type: "ping",
            timestamp: new Date().toISOString(),
          })}\n\n`
        );
      } catch (e) {
        console.error(
          `Error sending ping to client: ${req.query.clientId} in room: ${req.query.roomId}: `,
          e
        );
      }
    }, 5000);

    req.on("close", () => {
      console.log(`${req.query.clientId} Connection closed`);

      // Stop sending pings to client
      clearInterval(intervalId);

      // Remove client from room
      rooms[req.query.roomId].clients = rooms[req.query.roomId].clients.filter(
        (client) => client.id !== req.query.clientId
      );

      // If room is empty, delete it
      if (rooms[req.query.roomId].clients.length === 0) {
        rooms = Object.fromEntries(
          Object.entries(rooms).filter(
            ([key, value]) => key !== req.query.roomId
          )
        );
      }
    });
  } catch (e) {
    console.error(
      `Error on event stream for client ${req.query.clientId} in room ${req.query.roomId}: `,
      e
    );

    // try to close the connection
    try {
      res.end();
    } catch (e) {
      console.error(
        `Error ending event stream for client ${req.query.clientId} in room ${req.query.roomId}: `,
        e
      );
    }
  }
});

app.post("/room", async (req, res) => {
  try {
    const newRoom = await createNewRoom();
    rooms[newRoom.id] = newRoom;
    res.json(rooms[newRoom.id]);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
});

app.post("/client", (req, res) => {
  try {
    if (!req.body.clientName) throw new Error("No client name provided");

    const newClient = createNewClient(null, req.body.clientName);
    rooms[req.body.roomId].clients.push(newClient);
    res.json(newClient);
    return updateAllClients(rooms, req.body.roomId);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
});

app.post("/caption", (req, res) => {
  try {
    const newCaption = { ...req.body, id: nanoid(), points: 0 };

    if (!newCaption.text) throw new Error("No caption text provided");

    const existingCaption = rooms[req.body.roomId].currentCaptions.find(
      (caption) => caption.clientId === newCaption.clientId
    );
    if (existingCaption) throw new Error("Caption already exists");

    rooms[req.body.roomId].currentCaptions.push(newCaption);
    res.json(newCaption);
    return updateAllClients(rooms, req.body.roomId);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
});

app.post("/vote", async (req, res) => {
  try {
    const caption = rooms[req.body.roomId].currentCaptions.find(
      (c) => c.id === req.body.captionId
    );

    rooms[req.body.roomId].clients = rooms[req.body.roomId].clients.map(
      (client) => {
        if (
          rooms[req.body.roomId].clients.length ===
            rooms[req.body.roomId].currentCaptions.length && // all clients added a caption
          client.id === caption.clientId && // caption is from this client
          caption.clientId !== req.body.clientId && // client is not voting on their own caption
          !rooms[req.body.roomId].currentClientVotes.find(
            (v) => v.clientId === req.body.clientId
          ) // client has not voted yet
        ) {
          // add this vote to the list of votes
          rooms[req.body.roomId].currentClientVotes.push(req.body);

          // update the caption's points
          rooms[req.body.roomId].currentCaptions = rooms[
            req.body.roomId
          ].currentCaptions.map((c) => {
            if (c.id === caption.id) {
              c.points = c.points + 1;
            }
            return c;
          });

          // add points to client
          return { ...client, points: client.points + 1 };
        }

        // client has already voted or is voting on their own caption
        return client;
      }
    );

    res.json(req.body);

    // if all clients have voted, reset the room
    if (
      rooms[req.body.roomId].currentClientVotes.length ===
      rooms[req.body.roomId].clients.length
    ) {
      rooms[req.body.roomId] = {
        ...(await createNewRoom()),
        clients: rooms[req.body.roomId].clients,
        id: rooms[req.body.roomId].id,
        lastGif: rooms[req.body.roomId].currentGif,
        lastCaptions: rooms[req.body.roomId].currentCaptions,
        lastClientVotes: rooms[req.body.roomId].currentClientVotes,
      };
    }

    return updateAllClients(rooms, req.body.roomId);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
});
