import styled from "styled-components";

const StyleFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  jusitfy-content: center;
  gap: 20;
`;

const FormContainer = ({ children }) => {
  return <StyleFormContainer>{children}</StyleFormContainer>;
};

export { FormContainer };
