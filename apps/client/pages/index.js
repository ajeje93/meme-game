import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  ClientsTable,
  NewCaptionForm,
  NewClientForm,
  CaptionsTable,
  NewRoomForm,
} from "../components";
import { useApi } from "../utils/apiHelper";
import styled from "styled-components";
import { Container, GifContainer } from "../components/layouts";

const GifAndCaptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Home = () => {
  // Hooks
  const router = useRouter();
  const { room: roomId } = router.query;
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
      .then((data) =>
        router.push({
          pathname: "/",
          query: { room: data.id },
        })
      )
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
      <>
        <Container>
          <GifAndCaptionContainer>
            {roomData?.currentGif ? (
              <GifContainer>
                <img
                  style={{ maxHeight: 300 }}
                  src={roomData?.currentGif}
                  alt="meme gif"
                />
              </GifContainer>
            ) : null}
            <NewCaptionForm
              {...{ caption, onClickNewCaption, onCaptionChange }}
            />
          </GifAndCaptionContainer>
          <TablesContainer>
            <CaptionsTable
              currentCaptions={roomData.currentCaptions}
              onClickVote={onClickVote}
            />

            <ClientsTable clients={roomData.clients} />
          </TablesContainer>
        </Container>
      </>
    ) : (
      <NewClientForm {...{ name, onClickNewClient, onClientNameChange }} />
    )
  ) : (
    <NewRoomForm {...{ onClickNewRoom }} />
  );
};

export default Home;
