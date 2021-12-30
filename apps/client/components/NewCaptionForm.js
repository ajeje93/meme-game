import { TextField, Button } from "@mui/material";
import { FormContainer } from "./layouts";
import styled from "styled-components";

const CaptionContainer = styled.div`
  margin-top: 30px;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

const NewCaptionForm = ({ caption, onClickNewCaption, onCaptionChange }) => {
  return (
    <CaptionContainer>
      <form onSubmit={onClickNewCaption}>
        <FormContainer>
          <InputContainer>
            <TextField
              label="Caption"
              color="secondary"
              type="text"
              value={caption}
              onChange={onCaptionChange}
            />
          </InputContainer>
          <div>
            <Button variant="contained" type="submit">
              Send
            </Button>
          </div>
        </FormContainer>
      </form>
    </CaptionContainer>
  );
};

export { NewCaptionForm };
