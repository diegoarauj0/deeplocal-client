import { InputComponent } from "../../shared/components/input/input";
import { RectangleEllipsis, AtSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FormProvider } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import * as S from "./authCard.style";
import { Link } from "react-router";

export function LoginPage() {
  const { form, handleLogin } = useLogin();
  const { t } = useTranslation("auth");

  return (
    <S.AuthCard>
      <S.AuthTitle>{t("PAGES.LOGIN.TITLE")}</S.AuthTitle>
      <S.AuthDescription>{t("PAGES.LOGIN.DESCRIPTION")}</S.AuthDescription>
      <FormProvider {...form}>
        <S.AuthForm onSubmit={handleLogin}>
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
            {t("PAGES.LOGIN.SUBMIT")}
          </S.AuthSubmit>
        </S.AuthForm>
      </FormProvider>
      <S.LinksContainer>
        <Link to={"/auth/register"}>{t("PAGES.LOGIN.LINK_REGISTER")}</Link>
      </S.LinksContainer>
    </S.AuthCard>
  );
}
