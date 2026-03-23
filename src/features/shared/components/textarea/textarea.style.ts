import styled from "styled-components";

export const Content = styled.div`
  flex-wrap: wrap;
  display: flex;
`;

export const LabelContainer = styled.div`
  padding: 0.4rem;
  width: 100%;
`;

export const Textarea = styled.textarea`
  border: ${(props) => props.theme.border.normal} 1px solid;
  background-color: ${(props) => props.theme.bg.normal};
  color: ${(props) => props.theme.text.normal};
  border-radius: 0px 0.8rem 0.8rem 0px;
  min-width: 100%;
  font-size: 1rem;
  min-height: 80px;
  max-height: 80px;
  outline: none;
  padding: 1rem;
  padding-left: 0.5rem;

  &:focus {
    border: 1px solid ${(props) => props.theme.primary.normal};
  }

  &::placeholder {
    color: ${(props) => props.theme.text.muted};
  }
`;

export const Label = styled.label`
  color: ${(props) => props.theme.text.normal};
  font-weight: 500;
`;

export const ErrorContainer = styled.div`
  width: 100%;
  height: 30px;
`;

export const Error = styled.p`
  color: ${(props) => props.theme.danger};
  padding: 0.4rem;
  width: 100%;
`;
