import { TextareaComponent } from "../../../shared/components/textarea/textarea";
import type { InterfaceEditProfileTriggerProps } from "./editProfileTrigger";
import { InputComponent } from "../../../shared/components/input/input";
import { userConstant } from "../../../shared/constants/user.constant";
import { PopupContext } from "../../../shared/contexts/popup.context";
import { useUpdateUserForm } from "../../hooks/useUpdateUserForm";
import type { ColorUser } from "../../../shared/deeplocal.http";
import { useTranslation } from "react-i18next";
import { FormProvider } from "react-hook-form";
import { useContext, useState } from "react";
import { UserCircle } from "lucide-react";
import * as S from "./editProfile.style";
import { toast } from "react-toastify";

export function EditProfileModalComponent(props: InterfaceEditProfileTriggerProps) {
  const { closePopup } = useContext(PopupContext);
  const { defaultValues, identifier } = props;

  const TOAST_ID = "NOTIFICATION_EDIT_PROFILE_MODAL";
  const AUTO_CLOSE = 3000;

  const [selectedTheme, setSelectedTheme] = useState<ColorUser | undefined>(defaultValues.color);
  const { form, handleUpdateUser } = useUpdateUserForm({
    defaultValues,
    autoClose: AUTO_CLOSE,
    toastId: TOAST_ID,
    selectedTheme,
    identifier,
    closePopup,
  });
  const { t } = useTranslation("profile");

  const { isValid, isSubmitting } = form.formState;

  const handleTheme = (id: string) => {
    setSelectedTheme(id as ColorUser);

    toast.info(t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.THEME_SELECTED", { theme: id }), {
      toastId: id,
    });
  };

  return (
    <>
      <FormProvider {...form}>
        <S.Form onSubmit={handleUpdateUser}>
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

          <S.SubmitButton type="submit" $isValid={isValid} $isSubmitting={isSubmitting}>
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
                onClick={() => handleTheme(option.id)}
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
