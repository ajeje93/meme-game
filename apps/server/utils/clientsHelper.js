import { nanoid } from "nanoid";
import { getRoomData } from "./roomsHelper.js";

export const updateAllClients = (rooms, room) => {
  return rooms[room].clients.forEach((client) => {
    try {
      client.res.write(`data: ${JSON.stringify(getRoomData(rooms, room))}\n\n`);
    } catch (e) {
      console.error(`Error updating client ${client?.id} in room ${room}: `, e);
    }
  });
};

export const createNewClient = (clientId, clientName) => {
  return {
    id: clientId || nanoid(),
    name: clientName,
    points: 0,
  };
};
