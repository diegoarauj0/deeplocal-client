import styled from "styled-components";
import { PanelButton } from "../panel.style";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const CardStatus = styled.span`
  font-size: 0.85rem;
  color: ${(props) => props.theme.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const OptionRow = styled.div`
  padding-top: 0.5rem;
`;

export const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.text.normal};
`;

export const Checkbox = styled.input`
  accent-color: ${(props) => props.theme.primary.normal};
  width: 1rem;
  height: 1rem;
`;

export const DangerButton = styled(PanelButton)`
  border-color: ${(props) => props.theme.danger};
  color: ${(props) => props.theme.danger};

  &:hover {
    background-color: ${(props) => props.theme.danger};
    color: ${(props) => props.theme.text.normal};
  }
`;
