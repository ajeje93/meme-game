import { SERVER_URL } from "./constants";

const useApi = () => {
  const getPostHeaders = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  };

  const createNewRoom = () =>
    new Promise((resolve, reject) => {
      fetch(`${SERVER_URL}/room`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then(resolve)
        .catch(reject);
    });

  const createNewClient = (roomId, clientName) =>
    new Promise((resolve, reject) => {
      fetch(`${SERVER_URL}/client`, {
        method: "POST",
        headers: getPostHeaders(),
        body: JSON.stringify({
          clientName,
          roomId,
        }),
      })
        .then((response) => response.json())
        .then(resolve)
        .catch(reject);
    });

  const getRoomEventSource = (roomId, clientId, clientName) =>
    new EventSource(
      `${SERVER_URL}/events?roomId=${roomId}&clientId=${clientId}&clientName=${clientName}`
    );

  const createNewCaption = (text, clientId, roomId) =>
    new Promise((resolve, reject) => {
      fetch(`${SERVER_URL}/caption`, {
        method: "POST",
        headers: getPostHeaders(),
        body: JSON.stringify({
          text,
          clientId,
          roomId,
        }),
      })
        .then((response) => response.json())
        .then(resolve)
        .catch(reject);
    });

  const voteCaption = (captionId, clientId, roomId) =>
    new Promise((resolve, reject) => {
      fetch(`${SERVER_URL}/vote`, {
        method: "POST",
        headers: getPostHeaders(),
        body: JSON.stringify({
          captionId,
          clientId,
          roomId,
        }),
      })
        .then((response) => response.json())
        .then(resolve)
        .catch(reject);
    });

  return {
    createNewRoom,
    createNewClient,
    getRoomEventSource,
    createNewCaption,
    voteCaption,
  };
};

export { useApi };
