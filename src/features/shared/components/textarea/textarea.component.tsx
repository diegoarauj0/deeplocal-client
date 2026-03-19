import { useController, useFormContext } from "react-hook-form";
import * as S from "./textarea.style";
import { useId } from "react";

interface ITextareaProps {
  defaultValue?: string;
  placeholder?: string;
  label: string;
  name: string;
}

export function TextareaComponent({ label, name, placeholder, defaultValue }: ITextareaProps) {
  const { control } = useFormContext();
  const ID = useId();

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <S.Content>
      <S.LabelContainer>
        <S.Label htmlFor={ID}>{label}</S.Label>
      </S.LabelContainer>
      <S.Textarea id={ID} placeholder={placeholder} {...field} defaultValue={defaultValue} />
      <S.ErrorContainer>
        <S.Error id={`${ID}-error`}>{error?.message?.toString()}</S.Error>
      </S.ErrorContainer>
    </S.Content>
  );
}
