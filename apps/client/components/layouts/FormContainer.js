import { styled } from "@mui/material/styles";

const StyleFormContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
  [theme.breakpoints.down("md")]: {
    maxWidth: "100vw",
  },
}));

const FormContainer = ({ children }) => {
  return <StyleFormContainer>{children}</StyleFormContainer>;
};

export { FormContainer };
