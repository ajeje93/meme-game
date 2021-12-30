import { styled } from "@mui/material/styles";

const StyledContainer = styled("div")({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  paddingTop: "10%",
});

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export { Container };
