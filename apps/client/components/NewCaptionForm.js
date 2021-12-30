import { TextField, Button } from "@mui/material";
import { FormContainer } from "./layouts";
import { styled } from "@mui/material/styles";

const CaptionContainer = styled("div")({
  marginTop: 30,
});

const InputContainer = styled("div")({
  marginBottom: 10,
});

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
