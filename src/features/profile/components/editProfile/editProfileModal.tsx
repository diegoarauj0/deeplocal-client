import { TextareaComponent } from "../../../shared/components/textarea/textarea";
import { InputComponent } from "../../../shared/components/input/input";
import type { InterfaceEditProfileTriggerProps } from "./editProfileTrigger";
import { useUpdateUserForm } from "../../hooks/useUpdateUserForm";
import { userConstant } from "../../../shared/constants/user.constant";
import { useUpdateUser } from "../../hooks/reactQuery/useUpdateUser";
import { CURRENT_USERNAME_KEY } from "../../../auth/contexts/auth.provider";
import type { ColorUser } from "../../../shared/deeplocal.http";
import { useTranslation } from "react-i18next";
import { FormProvider } from "react-hook-form";
import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router";
import * as S from "./editProfile.style";
import { useContext, useState } from "react";
import { PopupContext } from "../../../shared/contexts/popup.context";

export function EditProfileModalComponent(props: InterfaceEditProfileTriggerProps) {
  const { closePopup } = useContext(PopupContext);
  const { defaultValues, identifier } = props;

  const [selectedTheme, setSelectedTheme] = useState<ColorUser | undefined>(defaultValues.color);
  const { mutateAsync, mutate } = useUpdateUser(identifier);
  const { form } = useUpdateUserForm({ defaultValues });
  const { t } = useTranslation("profile");
  const navigate = useNavigate();

  const { isValid, isSubmitting } = form.formState;

  const handleSubmit = form.handleSubmit(async (data) => {
    if (data.username === undefined) {
      mutate({ ...data, color: selectedTheme });
      return closePopup();
    }

    const { user } = await mutateAsync({ ...data, color: selectedTheme });

    if (user.username === data.username) {
      localStorage.setItem(CURRENT_USERNAME_KEY, user.username);
      await navigate(`/p/${user.username}`);
    }

    closePopup();
  });

  return (
    <>
      <FormProvider {...form}>
        <S.Form onSubmit={handleSubmit}>
          <InputComponent
            placeholder={t("COMPONENTS.EDIT_PROFILE.FORM.PLACEHOLDERS.NICKNAME")}
            label={t("COMPONENTS.EDIT_PROFILE.FORM.LABELS.NICKNAME")}
            name="nickname"
            type="text"
            logo={<UserCircle />}
          />

          <InputComponent
            placeholder={t("COMPONENTS.EDIT_PROFILE.FORM.PLACEHOLDERS.USERNAME")}
            label={t("COMPONENTS.EDIT_PROFILE.FORM.LABELS.USERNAME")}
            name="username"
            type="text"
            logo={<UserCircle />}
          />

          <TextareaComponent
            placeholder={t("COMPONENTS.EDIT_PROFILE.FORM.PLACEHOLDERS.BIO")}
            label={t("COMPONENTS.EDIT_PROFILE.FORM.LABELS.BIO")}
            name="bio"
          />

          <S.SubmitButton
            type="submit"
            disabled={!isValid || isSubmitting}
            $isValid={isValid}
            $isSubmitting={isSubmitting}
          >
            {isSubmitting ? t("COMPONENTS.EDIT_PROFILE.SUBMIT_LOADING") : t("COMPONENTS.EDIT_PROFILE.SUBMIT")}
          </S.SubmitButton>
        </S.Form>
      </FormProvider>

      <S.ThemeSection>
        <S.Title>{t("COMPONENTS.EDIT_PROFILE.THEME_TITLE")}</S.Title>

        <S.ThemeOptions>
          {userConstant.COLOR_OPTIONS.map((option) => {
            const isSelected = selectedTheme === option.id;

            return (
              <S.ColorOptionButton
                key={option.id}
                type="button"
                onClick={() => setSelectedTheme(option.id as ColorUser)}
                aria-pressed={isSelected}
                aria-label={t("COMPONENTS.EDIT_PROFILE.THEME_SELECT", { theme: option.id })}
                $background={option.background}
                $accent={option.accent}
                $selected={isSelected}
              />
            );
          })}
        </S.ThemeOptions>
      </S.ThemeSection>
    </>
  );
}
