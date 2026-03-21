import styled from "styled-components";

export const TriggerButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 0.65rem 1.3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.primary.normal};
  color: ${({ theme }) => theme.bg.dark};
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SubmitButton = styled.button<{ $isValid: boolean; $isSubmitting: boolean }>`
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
`
