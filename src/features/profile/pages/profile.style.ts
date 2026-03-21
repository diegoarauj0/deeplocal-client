import styled, { css, keyframes } from "styled-components";

const skeletonShimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const skeletonMixin = css`
  background-color: ${(props) => props.theme.bg.normal};
  background-image: ${(props) =>
    `linear-gradient(90deg, ${props.theme.bg.dark}, ${props.theme.bg.normal}, ${props.theme.bg.light}, ${props.theme.bg.normal}, ${props.theme.bg.dark})`};
  background-size: 200% 100%;
  background-repeat: no-repeat;
  animation: ${skeletonShimmer} 1.4s linear infinite;
  display: block;
`;

const mobileBreakpoint = "768px";
const phoneBreakpoint = "480px";

export const Profile = styled.div<{ $background: string | undefined | null }>`
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
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;

  @media (max-width: ${mobileBreakpoint}) {
    padding: 1.25rem 0.25rem 1.5rem;
    border-radius: 0px;
    border-top-color: transparent;
  }

  @media (max-width: ${phoneBreakpoint}) {
    padding: 0px;
  }
`;

export const ProfileTop = styled.div<{ $isBackgroundImage: boolean }>`
  backdrop-filter: ${(props) => (props.$isBackgroundImage ? "blur(10px)" : "none")};
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  gap: 1rem;
  border-top: ${(props) => (props.$isBackgroundImage ? `1px solid ${props.theme.highlight}` : "")};
  border-radius: 1rem;
  padding: 2rem 0;
  width: 80%;
  max-width: 900px;
  min-width: 600px;
  margin-bottom: 2rem;

  @media (max-width: ${mobileBreakpoint}) {
    width: 100%;
    padding: 1.5rem 0.25rem;
    border-top-color: transparent;
    min-width: 0px;
  }

  @media (max-width: ${phoneBreakpoint}) {
    padding: 1.25rem 0;
    border-radius: 0px;
  }
`;

export const Settings = styled.div`
  position: absolute;
  margin: 1.5rem;
  right: 0%;
  top: 0%;

  @media (max-width: ${mobileBreakpoint}) {
    margin: 0px;
    padding: 1rem;
    z-index: 10;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

export const LinksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ProfileNickname = styled.div<{ $isBackgroundImage: boolean }>`
  color: ${(props) => props.theme.text.normal};
  text-shadow: ${(props) => (props.$isBackgroundImage ? `1px 1px 3px ${props.theme.primary.normal}` : "none")};
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
    width: min(90vw, 340px);
    max-width: 360px;
  }
`;

export const AvatarSkeleton = styled.div`
  ${skeletonMixin}
  width: min(140px, 32vw);
  height: min(140px, 32vw);
  border-radius: 50%;
  border: 5px solid ${(props) => props.theme.bg.light};
  margin-bottom: 1rem;
`;

export const ProfileNicknameSkeleton = styled.div`
  ${skeletonMixin}
  width: 100%;
  height: 1.4rem;
  border-radius: 999px;
  margin: 0.5rem auto;
`;

export const ProfileUsernameSkeleton = styled.div`
  ${skeletonMixin}
  width: 40%;
  height: 1rem;
  border-radius: 999px;
  margin: 0 auto 1rem;
`;

export const ProfileBioSkeleton = styled.div`
  ${skeletonMixin}
  width: 80%;
  height: 3rem;
  border-radius: 1rem;
  margin: 0 auto;
`;

export const LinksPlaceholder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
`;

export const LinkSkeleton = styled.div`
  ${skeletonMixin}
  width: min(90vw, 20rem);
  height: 4rem;
  border-radius: 0.75rem;
`;

export const ProfileErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileError = styled.div`
  width: 100%;
  max-width: 460px;
  min-height: 160px;
  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.danger};
  background: ${(props) => props.theme.bg.dark};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1.25rem;
  text-align: left;
`;

export const ProfileErrorIcon = styled.div`
  color: ${(props) => props.theme.danger};
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  p {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${(props) => props.theme.text.normal};
  }

  small {
    color: ${(props) => props.theme.text.muted};
    font-size: 0.9rem;
  }
`;
