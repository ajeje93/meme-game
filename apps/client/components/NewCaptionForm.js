import { TextField, Button, Typography } from "@mui/material";
import { FormContainer } from "./layouts";
import { styled } from "@mui/material/styles";

const CaptionContainer = styled("div")({
  marginTop: 30,
});

const InputContainer = styled("div")({
  marginBottom: 10,
});

const NewCaptionForm = ({
  user,
  caption,
  clients,
  currentCaptions,
  onClickNewCaption,
  onCaptionChange,
}) => {
  return (
    <CaptionContainer>
      {currentCaptions?.find?.((caption) => caption.clientId === user?.id) ? (
        <Typography align="center">
          {clients.length === currentCaptions.length
            ? "Waiting for all users to vote..."
            : "Waiting for all users to insert a caption..."}
        </Typography>
      ) : (
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
      )}
    </CaptionContainer>
  );
};

export { NewCaptionForm };
