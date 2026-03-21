import styled from "styled-components";

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
  height: 140px;
  border-radius: 50%;
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

export const ProfileAvatarDisplay = styled.div`
  margin-bottom: 1rem;
  position: relative;
  width: 140px;
  height: 140px;

  svg {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    color: white;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    border-radius: 100%;
    padding: 3rem;
    cursor: pointer;
    filter: opacity(0%);
  }

  svg:hover {
    background-color: #00000086;
    filter: opacity(100%);
  }

  img {
    border-radius: 100%;
    width: 100%;
    height: 100%;
    border: 5px solid ${(props) => props.theme.bg.light};
  }
`;
