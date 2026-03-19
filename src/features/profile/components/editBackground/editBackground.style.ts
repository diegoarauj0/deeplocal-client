import styled from "styled-components";

export const FloatingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;

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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;

  input[type="file"] {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px dashed ${({ theme }) => theme.border.normal};
    background: ${({ theme }) => theme.bg.light};
    color: ${({ theme }) => theme.text.normal};
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      border-color: ${({ theme }) => theme.primary.normal};
    }

    &::file-selector-button {
      margin-right: 12px;
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      background: ${({ theme }) => theme.primary.normal};
      color: white;
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        opacity: 0.85;
      }
    }
  }
`;

export const PreviewContainer = styled.div`
  width: 140px;
  height: 100%;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.border.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg.light};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Submit = styled.button<{ $isValid: boolean; $isSubmitting: boolean }>`
  background-color: ${(props) => props.theme.primary.normal};
  color: ${(props) => props.theme.bg.dark};
  border-radius: 0.5rem;
  margin: 0.8rem 0px;
  transition: 0.3s;
  font-size: 1rem;
  cursor: ${(props) => (props.$isValid ? "pointer" : "not-allowed")};
  ${(props) => (props.$isSubmitting ? "cursor: progress;" : "")}
  padding: 1rem;
  border: none;
  width: 100%;

  ${(props) =>
    !props.$isValid
      ? ""
      : `
    &:hover {
      background-color: ${props.theme.primary.light};
      transform: scale(103%);
      transition: 0.2s;
    }
  `}
`;
