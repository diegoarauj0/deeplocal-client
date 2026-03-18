import { InputComponent } from "../../shared/components/input.component";
import { AtSign, CircleUserRound, RectangleEllipsis } from "lucide-react";
import { useRegister } from "../hooks/useRegister.hook";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import * as S from "./common.style";

export function RegisterPage() {
  const { form, handleRegister } = useRegister();
  const { t } = useTranslation("auth");

  return (
    <S.AuthCard>
      <S.AuthTitle>{t("pages.register.title")}</S.AuthTitle>
      <S.AuthDescription>{t("pages.register.description")}</S.AuthDescription>
      <FormProvider {...form}>
        <S.AuthForm onSubmit={handleRegister}>
          <InputComponent
            type="text"
            placeholder={t("pages.register.form.usernamePlaceholder")}
            label={t("pages.register.form.usernameLabel")}
            name="username"
            logo={<CircleUserRound />}
          />
          <InputComponent
            type="email"
            placeholder={t("pages.register.form.emailPlaceholder")}
            label={t("pages.register.form.emailLabel")}
            name="email"
            logo={<AtSign />}
          />
          <InputComponent
            type="password"
            placeholder={t("pages.register.form.passwordPlaceholder")}
            label={t("pages.register.form.passwordLabel")}
            name="password"
            logo={<RectangleEllipsis />}
          />
          <S.AuthSubmit $isValid={form.formState.isValid} $isSubmitting={form.formState.isSubmitting}>
            {t("pages.register.form.submit")}
          </S.AuthSubmit>
        </S.AuthForm>
      </FormProvider>
      <S.LinksContainer>
        <Link to={"/auth/login"}>{t("pages.register.links.login")}</Link>
      </S.LinksContainer>
    </S.AuthCard>
  );
}
