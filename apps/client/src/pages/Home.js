import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ClientsTable,
  NewCaptionForm,
  NewClientForm,
  CaptionsTable,
  NewRoomForm,
} from "../components";
import { useApi } from "../utils/apiHelper";
import "./Home.css";

const Home = () => {
  // Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get("room");
  const {
    createNewRoom,
    createNewClient,
    getRoomEventSource,
    createNewCaption,
    voteCaption,
  } = useApi();

  // States
  const [roomData, setRoomData] = useState({
    clients: [],
    currentGif: null,
    currentCaptions: [],
  });
  const [listening, setListening] = useState(false);
  const [name, setName] = useState("");
  const [user, setUser] = useState();
  const [caption, setCaption] = useState("");

  // Effects
  useEffect(() => {
    if (!roomId || !user || !getRoomEventSource) return;

    if (!listening) {
      const events = getRoomEventSource(roomId, user.id, user.name);
      events.onmessage = (event) => {
        setRoomData(JSON.parse(event.data));
      };

      setListening(true);
    }
  }, [listening, roomData, roomId, user, getRoomEventSource]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  // Functions
  const onClickNewRoom = (e) => {
    e.preventDefault();
    createNewRoom()
      .then((data) => setSearchParams({ room: data.id }))
      .catch(console.error);
  };

  const onClickNewCaption = (e) => {
    e.preventDefault();
    createNewCaption(caption, user.id, roomId)
      .then(() => setCaption(""))
      .catch(console.error);
  };

  const onCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const onClickNewClient = (e) => {
    e.preventDefault();
    createNewClient(roomId, name).then(setUser).catch(console.error);
  };

  const onClientNameChange = (e) => {
    setName(e.target.value);
  };

  const onClickVote = (caption) => {
    voteCaption(caption.id, user.id, roomId).catch(console.error);
  };

  return roomId ? (
    user ? (
      <div className="container">
        <NewCaptionForm {...{ caption, onClickNewCaption, onCaptionChange }} />
        {roomData?.currentGif ? (
          <div className="current-gif-container">
            <img
              src={roomData?.currentGif}
              alt="meme gif"
              className="current-gif"
            />
          </div>
        ) : null}
        <ClientsTable clients={roomData.clients} />
        <CaptionsTable
          currentCaptions={roomData.currentCaptions}
          onClickVote={onClickVote}
        />
      </div>
    ) : (
      <NewClientForm {...{ name, onClickNewClient, onClientNameChange }} />
    )
  ) : (
    <NewRoomForm {...{ onClickNewRoom }} />
  );
};

export { Home };
