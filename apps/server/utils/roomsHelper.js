const { nanoid } = require("nanoid");
const { getRandomGif } = require("./giphyHelper");

const getRoomData = (rooms, room) => {
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

const createNewRoom = async () => {
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

module.exports = {
  getRoomData,
  createNewRoom,
};
