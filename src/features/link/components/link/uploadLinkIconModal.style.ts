import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
  width: 100%;

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
  height: 140px;
  border-radius: 0.75rem;
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
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: ${({ theme }) => theme.primary.normal};
  color: ${({ theme }) => theme.bg.dark};
  font-size: 1rem;
  transition: 0.3s;
  cursor: ${({ $isValid }) => ($isValid ? "pointer" : "not-allowed")};
  ${({ $isSubmitting }) => $isSubmitting && "cursor: progress;"}

  ${({ $isValid, theme }) =>
    $isValid &&
    `&:hover {
      background-color: ${theme.primary.light};
      transform: scale(1.03);
    }`}
`;
