import { styled } from "@mui/material/styles";

const StyledContainer = styled("div")(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  paddingTop: "10%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export { Container };
