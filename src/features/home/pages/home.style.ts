import styled, { keyframes } from "styled-components";
import { Link } from "react-router";

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

export const Container = styled.main`
  width: 100%;
  height: 100%;
  padding: clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem) clamp(3rem, 5vw, 4rem);
  display: flex;
  box-shadow: 1px 1px 5px ${(props) => props.theme.shadow};
  border-radius: 1rem;
  border-top: 1px solid ${(props) => props.theme.highlight};
  flex-direction: column;
  gap: clamp(2rem, 4vw, 3rem);
  background: ${({ theme }) => theme.bg.dark};
  color: ${({ theme }) => theme.text.normal};
  overflow-y: auto;
`;

export const Header = styled.header`
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: clamp(2.75rem, 5vw, 3.75rem);
  font-weight: 700;
  letter-spacing: -0.04em;
`;

export const Description = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text.muted};
  line-height: 1.6;
`;

export const ExamplesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  font-weight: 600;
  letter-spacing: 0.04em;
`;

export const ExampleDisclaimer = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.text.muted};
  max-width: 640px;
  margin: 0;
`;

export const ExamplesTrack = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2vw, 1.5rem);
  animation: ${scroll} var(--scroll-speed, 32s) linear infinite;
  min-height: clamp(160px, 18vw, 220px);
  flex-wrap: nowrap;
  width: fit-content;
`;

export const ExamplesWrapper = styled.div`
  --scroll-speed: 32s;
  border-radius: 26px;
  overflow: hidden;
  background: ${({ theme }) => theme.bg.normal};
  border: 1px solid ${({ theme }) => theme.border.normal};
  padding: clamp(1rem, 2vw, 1.5rem);
  box-shadow: 0 30px 80px ${({ theme }) => theme.shadow};
  position: relative;

  &:hover ${ExamplesTrack} {
    animation-play-state: paused;
  }
`;

export const ExampleImage = styled.img`
  flex-shrink: 0;
  width: clamp(200px, 20vw, 260px);
  height: clamp(140px, 18vw, 220px);
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 25px 45px ${({ theme }) => theme.shadow};
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-6px) scale(1.04);
    box-shadow: 0 35px 65px ${({ theme }) => theme.shadow};
  }
`;

export const CTASection = styled.section`
  margin-top: clamp(1.5rem, 3vw, 2.25rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

export const CTAButton = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary.light}, ${({ theme }) => theme.primary.normal});
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  padding: 0.95rem 2.75rem;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 22px 45px ${({ theme }) => theme.shadow};
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  width: min(320px, 100%);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 28px 55px ${({ theme }) => theme.shadow};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.highlight};
    outline-offset: 4px;
  }
`;

export const CTAHelper = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text.muted};
  text-align: center;
  max-width: 450px;
`;
