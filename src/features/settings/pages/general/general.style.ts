import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const ControlLabel = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${(props) => props.theme.text.muted};
`;

export const Select = styled.select`
  border-radius: 0.85rem;
  border: 1px solid ${(props) => props.theme.border.muted};
  background: ${(props) => props.theme.bg.light};
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: ${(props) => props.theme.text.normal};
  font-weight: 600;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.primary.normal};
  }
`;

export const HelperText = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.text.muted};
  margin: 0;
`;
