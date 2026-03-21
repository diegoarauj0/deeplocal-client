import styled from "styled-components";

export const Button = styled.button`
  transition: 0.3s;
  border: transparent;
  box-shadow: 1px 1px 5px ${(props) => props.theme.shadow};
  border-top: 1px solid ${(props) => props.theme.highlight};
  background-color: ${(props) => props.theme.bg.light};
  color: ${(props) => props.theme.text.normal};
  justify-content: center;
  border-radius: 100%;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
  padding: 0.8rem;
  display: flex;
  outline: none;
  right: 0%;
  top: 0%;

  &:hover {
    transition: 0.2s;
    transform: scale(105%);
  }

  svg {
    height: 25px;
    width: 25px;
  }
`;
