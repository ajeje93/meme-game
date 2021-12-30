import { TextField, Button } from "@mui/material";
import { Container, FormContainer } from "./../components/layouts";
import { styled } from "@mui/material/styles";

const InputContainer = styled("div")({
  marginBottom: 10,
});

const NewClientForm = ({ name, onClickNewClient, onClientNameChange }) => {
  return (
    <Container>
      <form onSubmit={onClickNewClient}>
        <FormContainer>
          <InputContainer>
            <TextField
              label="Name"
              color="secondary"
              type="text"
              value={name}
              onChange={onClientNameChange}
            />
          </InputContainer>
          <div>
            <Button variant="contained" type="submit">
              Enter room
            </Button>
          </div>
        </FormContainer>
      </form>
    </Container>
  );
};

export { NewClientForm };
