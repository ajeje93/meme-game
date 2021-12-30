import { Typography, Button } from "@mui/material";
import { Container, FormContainer } from "./../components/layouts";

const NewRoomForm = ({ onClickNewRoom }) => {
  return (
    <Container>
      <form onSubmit={onClickNewRoom}>
        <FormContainer>
          <div>
            <Typography>No room</Typography>
          </div>
          <div>
            <Button variant="contained" type="submit">
              Create new room
            </Button>
          </div>
        </FormContainer>
      </form>
    </Container>
  );
};

export { NewRoomForm };
