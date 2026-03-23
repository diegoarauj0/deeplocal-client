import styled from "styled-components";

export const Panel = styled.div<{ $gap?: string; $padding?: string; $shadow?: boolean }>`
  background-color: ${(props) => props.theme.bg.light};
  border: 1px solid ${(props) => props.theme.border.normal};
  border-radius: 1.2rem;
  padding: ${(props) => props.$padding ?? "1.5rem"};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap ?? "1rem"};
  box-shadow: ${(props) => (props.$shadow ? "0 6px 16px rgba(0, 0, 0, 0.05)" : "none")};
`;

export const PanelHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const PanelTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.text.normal};
`;

export const PanelSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.text.muted};
  line-height: 1.4;
  margin: 0;
`;

export const PanelDescription = styled.p`
  font-size: 0.95rem;
  color: ${(props) => props.theme.text.muted};
  margin: 0;
  line-height: 1.4;
`;

export const PanelActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const PanelButton = styled.button`
  border-radius: 0.85rem;
  border: 1px solid ${(props) => props.theme.primary.normal};
  background: transparent;
  padding: 0.45rem 1.1rem;
  font-weight: 600;
  color: ${(props) => props.theme.primary.normal};
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;

  &:hover {
    background-color: ${(props) => props.theme.primary.normal};
    color: ${(props) => props.theme.text.normal};
  }
`;
