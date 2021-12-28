const { nanoid } = require("nanoid");
const { getRoomData } = require("./roomsHelper");

const updateAllClients = (rooms, room) => {
  return rooms[room].clients.forEach((client) => {
    try {
      client.res.write(`data: ${JSON.stringify(getRoomData(rooms, room))}\n\n`);
    } catch (e) {
      console.error(e);
    }
  });
};

const createNewClient = (clientId, clientName) => {
  return {
    id: clientId || nanoid(),
    name: clientName,
    points: 0,
  };
};

module.exports = {
  createNewClient,
  updateAllClients,
};
