import styled from "styled-components";
import { Link } from "react-router";

export const FloatingLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  text-decoration: none;

  background: ${({ theme }) => theme.bg.light};
  color: ${({ theme }) => theme.text.normal};

  border-top: 1px solid ${({ theme }) => theme.highlight};
  box-shadow: 1px 1px 5px ${({ theme }) => theme.shadow};

  transition: 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  svg {
    width: 25px;
    height: 25px;
  }
`;
