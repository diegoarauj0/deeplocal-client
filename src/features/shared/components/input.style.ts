import styled from "styled-components"

export const Content = styled.div`
  flex-wrap: wrap;
  display: flex;
`

export const LabelContainer = styled.div`
  padding: 0.4rem;
  width: 100%;
`

export const Input = styled.input`
  border: ${(props) => props.theme.border.normal} 1px solid;
  background-color: ${(props) => props.theme.bg.normal};
  color: ${(props) => props.theme.text.normal};
  border-radius: 0px 0.8rem 0.8rem 0px;
  border-left: none;
  width: calc(100% - 40px);
  font-size: 1rem;
  outline: none;
  padding: 1rem;
  padding-left: 0.5rem;

  &:focus {
    border: 1px solid ${(props) => props.theme.primary.normal};
    border-left: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.text.muted};
  }
`

export const Label = styled.label`
  color: ${(props) => props.theme.text.normal};
  font-weight: 500;
`

export const IconContainer = styled.div<{ $focus: boolean }>`
  background-color: ${(props) => props.theme.bg.normal};
  border: ${(props) => props.theme.border.normal} 1px solid;
  border-radius: 0.8rem 0px 0px 0.8rem;
  ${(props) => (props["$focus"] ? `border: 1px solid ${props.theme.primary.normal};` : "")}
  justify-content: center;
  align-items: center;
  border-right: none;
  display: flex;
  width: 40px;

  svg {
    height: 100%;
    color: ${(props) => props["$focus"]?props.theme.primary.normal:props.theme.text.muted};
  }
`

export const ErrorContainer = styled.div``

export const Error = styled.p`
  color: ${(props) => props.theme.danger};
  padding: 0.4rem;
  width: 100%;
`
