import { TextareaComponent } from "../../../shared/components/textarea/textarea";
import type { InterfaceEditProfileTriggerProps } from "./editProfileTrigger";
import { CURRENT_USERNAME_KEY } from "../../../auth/contexts/auth.provider";
import { InputComponent } from "../../../shared/components/input/input";
import { userConstant } from "../../../shared/constants/user.constant";
import { PopupContext } from "../../../shared/contexts/popup.context";
import { useUpdateUser } from "../../hooks/reactQuery/useUpdateUser";
import { useUpdateUserForm } from "../../hooks/useUpdateUserForm";
import type { ColorUser } from "../../../shared/deeplocal.http";
import { useTranslation } from "react-i18next";
import { FormProvider } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserCircle } from "lucide-react";
import * as S from "./editProfile.style";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export function EditProfileModalComponent(props: InterfaceEditProfileTriggerProps) {
  const { closePopup } = useContext(PopupContext);
  const { defaultValues, identifier } = props;

  const [selectedTheme, setSelectedTheme] = useState<ColorUser | undefined>(defaultValues.color);
  const { mutateAsync } = useUpdateUser(identifier);
  const { form } = useUpdateUserForm({ defaultValues });
  const { t } = useTranslation("profile");
  const navigate = useNavigate();

  const toastId = "NOTIFICATION_EDIT_PROFILE_MODAL";
  const AUTO_CLOSE = 3000;

  const { isValid, isSubmitting } = form.formState;

  const handleTheme = (id: string) => {
    setSelectedTheme(id as ColorUser);

    toast.info(t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.THEME_SELECTED", { theme: id }), {
      toastId: id,
    });
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    toast.loading(t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.LOADING"), { toastId });

    try {
      if (data.username !== defaultValues.username) {
        toast.warning(t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.USERNAME_WARNING"), {
          autoClose: AUTO_CLOSE * 2,
          isLoading: false,
        });

        const { user } = await mutateAsync({ ...data, color: selectedTheme });

        toast.update(toastId, {
          render: t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.SUCCESS"),
          type: "success",
          autoClose: AUTO_CLOSE,
          isLoading: false,
        });

        if (user.username === data.username) {
          localStorage.setItem(CURRENT_USERNAME_KEY, user.username);
          await navigate(`/p/${user.username}`);
        }

        return closePopup();
      }

      await mutateAsync({ ...data, color: selectedTheme });

      toast.update(toastId, {
        render: t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.SUCCESS"),
        type: "success",
        autoClose: AUTO_CLOSE,
        isLoading: false,
      });

      closePopup();
    } catch (error) {
      if (error instanceof AxiosError) {
        const code = error.response?.data?.error?.code;

        if (code === "VALIDATION_ERROR_EXCEPTION") {
          const details = error.response?.data?.error?.details ?? [];

          for (const detail of details) {
            const field = detail.name as "username" | "nickname" | "bio";
            const message = detail.reasons?.[0]?.message;

            if (message) {
              form.setError(field, { message });
            }
          }

          return toast.update(toastId, {
            render: t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.INVALID_FORM"),
            type: "error",
            isLoading: false,
            autoClose: AUTO_CLOSE,
          });
        }

        if (code === "USERNAME_ALREADY_IN_USE_EXCEPTION") {
          form.setError("username", { message: t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.USERNAME_ALREADY_IN_USE") });

          return toast.update(toastId, {
            render: t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.USERNAME_ALREADY_IN_USE"),
            type: "error",
            isLoading: false,
            autoClose: AUTO_CLOSE,
          });
        }
      }

      return toast.update(toastId, {
        render: t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.UNEXPECTED"),
        type: "error",
        isLoading: false,
        autoClose: AUTO_CLOSE,
      });
    }
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
