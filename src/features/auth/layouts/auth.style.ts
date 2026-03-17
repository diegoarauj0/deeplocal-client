import styled from "styled-components"

export const Content = styled.main`
  background-color: ${(props) => props.theme.bg.void};
  padding: 1rem;
  height: 100vh;
  width: 100vw;

  @media screen and (max-width: 600px) {
    align-items: flex-end;
    display: flex;
    padding: 0px;
  }
`

export const CenteredContainer = styled.div`
  background-image: linear-gradient(to top, ${(props) => props.theme.bg.dark}, ${(props) => props.theme.bg.normal});
  border-top: 1px solid ${(props) => props.theme.highlight};
  box-shadow: 1px 1px 5px ${(props) => props.theme.shadow};
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  height: 100%;
  width: 100%;

  @media screen and (max-width: 600px) {
    border-radius: 0px;
    box-shadow: none;
  }

  @media screen and (max-width: 600px) {
    border-radius: 5rem 0px 0px 0px;
    padding: 0px;
    height: 95%;
  }
`

export const AuthContainer = styled.div`
  margin-right: 0.5rem;
  height: 100%;
  width: 60%;

  @media screen and (max-width: 1200px) {
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    margin-right: 0px;
  }
`

export const BackgroundContainer = styled.div`
  background-image: url("/public/bg-auth.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 1rem;
  margin-left: 0.5rem;
  position: relative;
  height: 100%;
  width: 40%;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`
