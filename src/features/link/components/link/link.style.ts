import styled from "styled-components";

export const Link = styled.a`
  width: 100%;
  background: ${(props) => props.theme.bg.dark};
  border: 1px solid ${(props) => props.theme.border.normal};
  border-radius: 0.85rem;
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.primary.normal};
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.primary.light};
    outline-offset: 2px;
  }

  &[data-enabled="false"] {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 0.75rem;
  border: 1px solid ${(props) => props.theme.border.muted};
  background: ${(props) => props.theme.bg.light};
  display: grid;
  place-items: center;
  overflow: hidden;
`;

export const IconImage = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
`;

export const IconFallback = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.text.normal};
  text-transform: uppercase;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  overflow: hidden;
`;

export const Title = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.text.normal};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Url = styled.span`
  font-size: 0.85rem;
  color: ${(props) => props.theme.text.muted};
  word-break: break-all;
`;
