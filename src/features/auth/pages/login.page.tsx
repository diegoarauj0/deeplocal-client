import { InputComponent } from "../../shared/components/input/input.component";
import { RectangleEllipsis, AtSign } from "lucide-react";
import { useLogin } from "../hooks/useLogin.hook";
import { FormProvider } from "react-hook-form";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import * as S from "./common.style";

export function LoginPage() {
  const { form, handleLogin } = useLogin();
  const { t } = useTranslation("auth");

  return (
    <S.AuthCard>
      <S.AuthTitle>{t("pages.login.title")}</S.AuthTitle>
      <S.AuthDescription>{t("pages.login.description")}</S.AuthDescription>
      <FormProvider {...form}>
        <S.AuthForm onSubmit={handleLogin}>
          <InputComponent
            type="email"
            placeholder={t("pages.login.form.emailPlaceholder")}
            label={t("pages.login.form.emailLabel")}
            name="email"
            logo={<AtSign />}
          />
          <InputComponent
            type="password"
            placeholder={t("pages.login.form.passwordPlaceholder")}
            label={t("pages.login.form.passwordLabel")}
            name="password"
            logo={<RectangleEllipsis />}
          />
          <S.AuthSubmit $isValid={form.formState.isValid} $isSubmitting={form.formState.isSubmitting}>
            {t("pages.login.form.submit")}
          </S.AuthSubmit>
        </S.AuthForm>
      </FormProvider>
      <S.LinksContainer>
        <Link to={"/auth/register"}>{t("pages.login.links.register")}</Link>
      </S.LinksContainer>
    </S.AuthCard>
  );
}
