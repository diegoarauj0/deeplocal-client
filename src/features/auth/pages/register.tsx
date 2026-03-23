import { AtSign, CircleUserRound, RectangleEllipsis } from "lucide-react";
import { InputComponent } from "../../shared/components/input/input";
import { useRegister } from "../hooks/useRegister";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as S from "./authCard.style";
import { Link } from "react-router";

export function RegisterPage() {
  const { form, handleRegister } = useRegister();
  const { t } = useTranslation("auth");

  return (
    <S.AuthCard>
      <S.AuthTitle>{t("PAGES.REGISTER.TITLE")}</S.AuthTitle>
      <S.AuthDescription>{t("PAGES.REGISTER.DESCRIPTION")}</S.AuthDescription>
      <FormProvider {...form}>
        <S.AuthForm onSubmit={handleRegister}>
          <InputComponent
            type="text"
            placeholder={t("FORM.PLACEHOLDERS.USERNAME")}
            label={t("FORM.LABELS.USERNAME")}
            name="username"
            logo={<CircleUserRound />}
          />
          <InputComponent
            type="email"
            placeholder={t("FORM.PLACEHOLDERS.EMAIL")}
            label={t("FORM.LABELS.EMAIL")}
            name="email"
            logo={<AtSign />}
          />
          <InputComponent
            type="password"
            placeholder={t("FORM.PLACEHOLDERS.PASSWORD")}
            label={t("FORM.LABELS.PASSWORD")}
            name="password"
            logo={<RectangleEllipsis />}
          />
          <S.AuthSubmit $isValid={form.formState.isValid} $isSubmitting={form.formState.isSubmitting}>
            {t("PAGES.REGISTER.SUBMIT")}
          </S.AuthSubmit>
        </S.AuthForm>
      </FormProvider>
      <S.LinksContainer>
        <Link to={"/auth/login"}>{t("PAGES.REGISTER.LINK_LOGIN")}</Link>
      </S.LinksContainer>
    </S.AuthCard>
  );
}
