import styled from "styled-components";

const StyledGifContainer = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const GifContainer = ({ children }) => {
  return <StyledGifContainer>{children}</StyledGifContainer>;
};

export { GifContainer };
