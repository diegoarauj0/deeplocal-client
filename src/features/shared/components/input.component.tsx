import { useId, useState, type ReactNode } from "react";
import * as S from "./input.style";
import { useController, useFormContext } from "react-hook-form";

interface IInputProps {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  logo: ReactNode;
  label: string;
  name: string;
}

export function InputComponent({ label, type, placeholder, logo, name }: IInputProps) {
  const [focus, setFocus] = useState(false);
  const { control } = useFormContext();
  const ID = useId();

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    field.onBlur();
    setFocus(false);
  };

  return (
    <S.Content>
      <S.LabelContainer>
        <S.Label htmlFor={ID}>{label}</S.Label>
      </S.LabelContainer>
      <S.IconContainer $focus={focus}>{logo}</S.IconContainer>
      <S.Input
        id={ID}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${ID}-error` : undefined}
        {...field}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <S.ErrorContainer>
        <S.Error id={`${ID}-error`}>{error?.message?.toString()}</S.Error>
      </S.ErrorContainer>
    </S.Content>
  );
}
