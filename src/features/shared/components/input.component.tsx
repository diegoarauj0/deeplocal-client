import { useId, useState, type ReactNode } from "react"
import * as S from "./input.style"

interface IInputProps {
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  logo: ReactNode
  label: string
}

export function InputComponent({ label, type, placeholder, logo }: IInputProps) {
  const [focus, setFocus] = useState<boolean>(false)
  const ID = useId()

  return (
    <S.Content>
      <S.LabelContainer>
        <S.Label htmlFor={ID}>{label}</S.Label>
      </S.LabelContainer>
      <S.IconContainer $focus={focus}>{logo}</S.IconContainer>
      <S.Input
        type={type}
        id={ID}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <S.ErrorContainer>
        <S.Error>Error.</S.Error>
      </S.ErrorContainer>
    </S.Content>
  )
}
