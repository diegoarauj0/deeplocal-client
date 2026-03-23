import styled from "styled-components";

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
`;
