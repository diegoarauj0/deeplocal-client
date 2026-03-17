import styled from "styled-components"

export const AuthCard = styled.div`
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  height: 100%;
  width: 100%;
`

export const AuthTitle = styled.h2`
  color: ${(props) => props.theme.text.normal};
  margin-bottom: 1rem;
  font-size: 2rem;
`

export const AuthDescription = styled.p`
  color: ${(props) => props.theme.text.muted};
  text-align: center;

  @media screen and (max-width: 600px) {
    display: none;
  }
`

export const AuthForm = styled.form`
  padding: 1rem;
  width: 100%;
`

export const AuthSubmit = styled.button`
  background-color: ${(props) => props.theme.primary.normal};
  color: ${(props) => props.theme.bg.dark};
  border-radius: 0.5rem;
  margin: 0.8rem 0px;
  transition: 0.3s;
  font-size: 1rem;
  cursor: pointer;
  padding: 1rem;
  border: none;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.primary.light};
    transform: scale(103%);
    transition: 0.2s;
  }
`

export const LinksContainer = styled.div`
  text-align: center;
  width: 100%;

  a {
    color: ${(props) => props.theme.primary.normal};
  }
`
