import { styled } from "@mui/material/styles";

const StyleFormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
});

const FormContainer = ({ children }) => {
  return <StyleFormContainer>{children}</StyleFormContainer>;
};

export { FormContainer };
