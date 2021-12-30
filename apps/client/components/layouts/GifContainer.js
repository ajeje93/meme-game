import { styled } from "@mui/material/styles";

const StyledGifContainer = styled("div")({
  padding: "0 16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
});

const GifContainer = ({ children }) => {
  return <StyledGifContainer>{children}</StyledGifContainer>;
};

export { GifContainer };
