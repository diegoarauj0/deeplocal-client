import styled from "styled-components";
import { NavLink } from "react-router";

const mobileBreakpoint = "768px";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 4rem auto;
  gap: 1rem;
  height: 100%;

  @media screen and (max-width: ${mobileBreakpoint}) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  background: linear-gradient(${(props) => props.theme.bg.normal}, ${(props) => props.theme.bg.dark});
  border-top: 1px solid ${(props) => props.theme.highlight};
  border-radius: 1.2rem;
  filter: opacity(90%);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: calc(100vh - 2rem);
  grid-row: 2 / 3;

  @media screen and (max-width: ${mobileBreakpoint}) {
    position: static;
    width: 100%;
    max-height: none;
  }
`;

export const SidebarTitle = styled.h2`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${(props) => props.theme.text.muted};
`;

export const SidebarLink = styled(NavLink)`
  transition: 0.2s;
  border-radius: 0.9rem;
  border: 2px solid transparent;
  padding: 0.75rem 1rem;
  font-weight: 600;
  font-size: 1rem;
  color: ${(props) => props.theme.text.normal};
  text-decoration: none;
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }

  &.active {
    background-color: ${(props) => props.theme.bg.light};
    color: ${(props) => props.theme.text.normal};
  }

  &:hover {
    border-bottom-color: ${(props) => props.theme.bg.light};
    border-left-color: ${(props) => props.theme.bg.light};
  }
`;

export const Main = styled.section`
  background-color: ${(props) => props.theme.bg.normal};
  border: 1px solid ${(props) => props.theme.border.normal};
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;

export const Header = styled.header`
  background: linear-gradient(${(props) => props.theme.bg.normal}, ${(props) => props.theme.bg.dark});
  border-top: 1px solid ${(props) => props.theme.highlight};
  border-radius: 1rem;
  filter: opacity(90%);
  align-items: center;
  grid-column: 1 / 3;
  padding: 0px 1rem;
  display: flex;
`;

export const BackButton = styled.button`
  transition: 0.4s;
  background: transparent;
  color: ${(props) => props.theme.text.normal};
  width: 2.75rem;
  height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  border-radius: 100%;
  margin-right: 1rem;

  &:hover {
    transition: 0.2s;
    background-color: ${(props) => props.theme.bg.normal};
    transform: translate(-3px) scale(105%);
  }

  svg {
    width: 25px;
    height: 25px;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.text.normal};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;
  overflow: hidden;
`;

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
