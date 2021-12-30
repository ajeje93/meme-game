import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 10%;
`;

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export { Container };
