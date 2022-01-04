import { styled } from "@mui/material/styles";

const StyledGifContainer = styled("div")(({ theme }) => ({
  padding: "0 16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
  [theme.breakpoints.down("md")]: {
    maxWidth: "100vw",
  },
}));

const GifContainer = ({ children }) => {
  return <StyledGifContainer>{children}</StyledGifContainer>;
};

export { GifContainer };
