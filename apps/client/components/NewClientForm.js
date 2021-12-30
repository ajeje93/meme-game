import { TextField, Button } from "@mui/material";
import { Container, FormContainer } from "./../components/layouts";
import styled from "styled-components";

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

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
              Create
            </Button>
          </div>
        </FormContainer>
      </form>
    </Container>
  );
};

export { NewClientForm };
