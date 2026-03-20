import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  z-index: 1000;
`;

export const Modal = styled.div`
  width: min(95vw, 520px);
  padding: 28px;
  border-radius: 26px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  background: ${({ theme }) => theme.bg.light};
  border-top: 1px solid ${({ theme }) => theme.highlight};
  box-shadow: 0 25px 60px ${({ theme }) => theme.shadow};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.normal};
`;

export const Description = styled.p`
  margin: 4px 0 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text.muted};
`;

export const CloseButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.06);
  color: ${({ theme }) => theme.text.muted};

  transition: 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary ?? "#7a5dff"};
    outline-offset: 3px;
  }
`;
