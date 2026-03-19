import styled from "styled-components";

export const Content = styled.main`
  box-shadow: 1px 1px 5px ${(props) => props.theme.shadow};
  background-color: ${(props) => props.theme.bg.void};
  position: relative;
  padding: 0.5rem;
  height: 100vh;
  width: 100vw;
`;