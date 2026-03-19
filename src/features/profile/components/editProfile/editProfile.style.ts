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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const SubmitButton = styled.button<{
  $isValid: boolean;
  $isSubmitting: boolean;
}>`
  width: 100%;
  padding: 1rem;
  margin: 0.8rem 0;
  border: none;
  border-radius: 0.5rem;

  font-size: 1rem;

  color: ${({ theme }) => theme.bg.dark};
  background: ${({ theme }) => theme.primary.normal};

  cursor: ${({ $isValid }) => ($isValid ? "pointer" : "not-allowed")};

  ${({ $isSubmitting }) => $isSubmitting && "cursor: progress;"}

  transition: 0.2s;

  ${({ $isValid, theme }) =>
    $isValid &&
    `
      &:hover {
        background: ${theme.primary.light};
        transform: scale(1.03);
      }
    `}
`;

export const ThemeSection = styled.div`
  width: 100%;
`;

export const ThemeOptions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

interface ColorOptionProps {
  $background: string;
  $accent: string;
  $selected?: boolean;
}

export const ColorOptionButton = styled.button<ColorOptionProps>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  background: ${({ $background }) => $background};
  border: 3px solid ${({ $selected, $accent }) => ($selected ? $accent : "#d5d5d5")};

  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${({ $accent }) => $accent};
    outline-offset: 3px;
  }
`;

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
