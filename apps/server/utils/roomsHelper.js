import { nanoid } from "nanoid";
import { getRandomGif } from "./giphyHelper.js";

export const getRoomData = (rooms, room) => {
  return {
    type: "roomData",
    ...rooms[room],
    clients: rooms[room].clients.map(({ id, name, points }) => ({
      id,
      name,
      points,
    })),
  };
};

export const createNewRoom = async () => {
  return {
    id: nanoid(),
    clients: [],
    currentGif: await getRandomGif(),
    currentCaptions: [],
    currentClientVotes: [],
    lastGif: null,
    lastCaptions: [],
    lastClientVotes: [],
  };
};
