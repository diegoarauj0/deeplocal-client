import styled from "styled-components";

export const DraggableLinkContainer = styled.div<{ $transform: string | undefined; $disabled: boolean | undefined, $enabled: boolean }>`
  ${(props) => (props.$transform ? `transform: ${props.$transform};` : "")}
  width: min(560px, 100%);
  background: ${(props) => props.theme.bg.dark};
  border: 1px solid ${(props) => props.theme.border.normal};
  border-radius: 0.85rem;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  margin-bottom: 1rem;
  ${props => props.$enabled?"":"opacity: 70%;"}
  ${(props) => (props.$disabled ? "cursor: not-allowed;" : "")}
  ${(props) => (props.$disabled ? "opacity: 50%;" : "")}
  transition: 0.2s;
  user-select: none;
  display: grid;
  gap: 0.5rem;
  padding: 0.85rem 1rem;
  grid-template-columns: 50px auto 50px 50px 50px 50px;
  grid-template-rows: 50px;

  &:hover {
    border-color: ${(props) => (props.$disabled ? props.theme.danger : props.theme.primary.normal)};
  }
`;

export const Link = styled.a`
  width: min(560px, 100%);
  background: ${(props) => props.theme.bg.dark};
  border: 1px solid ${(props) => props.theme.border.normal};
  border-radius: 0.85rem;
  margin-bottom: 1rem;
  transition: 0.2s;
  display: grid;
  gap: 0.5rem;
  padding: 0.85rem 1rem;
  grid-template-columns: 50px auto;
  grid-template-rows: 50px;
  text-decoration: none;

  &:hover {
    border-color: ${(props) => props.theme.primary.normal};
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
    transform: translateY(-2px);
  }
`;

export const IconUploadButton = styled.button`
  position: absolute;
  inset: 0;
  border: none;
  background: rgba(0, 0, 0, 0.65);
  border-radius: inherit;
  color: ${(props) => props.theme.bg.light};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  cursor: pointer;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: white;
  }
`;

export const IconWrapper = styled.div<{ $interactive?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  border-radius: 0.75rem;
  overflow: hidden;

  ${(props) =>
    props.$interactive
      ? `
    cursor: pointer;

    ${IconUploadButton} {
      opacity: 0;
      pointer-events: none;
    }

    &:hover ${IconUploadButton} {
      opacity: 1;
      pointer-events: all;
    }
  `
      : ""}
`;

export const IconContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.border.muted};
  background: ${(props) => props.theme.bg.light};
  border-radius: 0.75rem;
  place-items: center;
  overflow: hidden;
  display: grid;
`;

export const IconImage = styled.img`
    width: 100%;
    height: 100%;
`;

export const IconFallback = styled.span`
  color: ${(props) => props.theme.text.normal};
  text-transform: uppercase;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const TitleContainer = styled.div`
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  display: flex;
  gap: 0.15rem;
`;

export const Title = styled.span`
  color: ${(props) => props.theme.text.normal};
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  font-size: 1rem;
  overflow: hidden;
`;

export const Url = styled.span`
  font-size: 0.85rem;
  color: ${(props) => props.theme.text.muted};
  word-break: break-all;
`;

export const LinkHandlerButton = styled.button<{ $disabled?: boolean }>`
  transition: 0.4s;
  color: ${(props) => props.theme.text.normal};
  background-color: transparent;
  cursor: pointer;
  outline: none;
  border: none;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  ${(props) => (props.$disabled ? "opacity: 50%;" : `&:hover {transition: 0.2s;transform: translateY(-3px);}`)}
`;


export const GripIconContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;

  svg {
    filter: invert(100%) opacity(30%);
    height: 50%;
    width: 50%;
  }
`;
