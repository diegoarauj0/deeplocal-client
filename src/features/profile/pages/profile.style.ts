import styled from "styled-components";

export const Profile = styled.div<{  $background: string | undefined | null }>`
  background-image: ${(props) =>
    props.$background
      ? `url("${props.$background}")`
      : `linear-gradient(to top, ${props.theme.bg.dark}, ${props.theme.bg.normal})`};
  border-top: 1px solid ${(props) => props.theme.highlight};
  background-position: center, center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 1rem;
  padding: 2rem;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const ProfileTop = styled.div<{ $isBackgroundImage: boolean }>`
  backdrop-filter: ${(props) => (props.$isBackgroundImage ? "blur(10px)" : "none")};
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  border-top: ${(props) => (props.$isBackgroundImage ? `1px solid ${props.theme.highlight}` : "")}
  border-radius: 1rem;
  padding: 2rem 0px;
  width: 60%;
`;

export const Settings = styled.div`
  position: absolute;
  margin: 1.5rem;
  right: 0%;
  top: 0%;
`;

export const LinksContainer = styled.div``;

export const ProfileNickname = styled.div`
  color: ${(props) => props.theme.text.normal};
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  width: 100%;
`;

export const ProfileUsername = styled.div`
  color: ${(props) => props.theme.text.muted};
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1rem;
  width: 100%;
`;

export const ProfileBio = styled.div`
  color: ${(props) => props.theme.text.muted};
  justify-content: center;
  font-size: 1rem;
  display: flex;
  width: 100%;

  p {
    text-align: center;
    font-weight: 600;
    width: 50%;
    max-width: 350px;
  }
`;
