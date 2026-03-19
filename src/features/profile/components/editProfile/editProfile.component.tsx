import { TextareaComponent } from "../../../shared/components/textarea/textarea.component";
import { InputComponent } from "../../../shared/components/input/input.component";
import { userConstant } from "../../../shared/constants/user.constant";
import { useUpdateUserForm } from "../../hooks/useUpdateUserForm.hook";
import { useUpdateUser } from "../../hooks/useUpdateUser.hook";
import { Settings, UserCircle, X } from "lucide-react";
import * as S from "./editProfile.style";
import { FormProvider } from "react-hook-form";
import { useState } from "react";
import { CURRENT_USERNAME_KEY } from "../../../auth/auth.provider";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

interface IEditProfileProps {
  defaultValues: {
    username: string;
    nickname: string;
    color?: string;
    bio?: string;
  };
  identifier: string;
}

interface IEditProfileModalProps extends IEditProfileProps {
  onClose: () => void;
}

function EditProfileModal({ onClose, defaultValues, identifier }: IEditProfileModalProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(defaultValues.color);
  const { mutateAsync, mutate } = useUpdateUser(identifier);
  const { form } = useUpdateUserForm();
  const navigate = useNavigate();
  const { t } = useTranslation("profile");

  const { isValid, isSubmitting } = form.formState;

  const handleBackdropClick = () => onClose();
  const stopPropagation = (event: React.MouseEvent) => event.stopPropagation();

  const handleSubmit = form.handleSubmit(async (data) => {
    if (data.username === undefined) {
      mutate({ ...data, color: selectedTheme });
      return onClose();
    }

    const { user } = await mutateAsync({ ...data, color: selectedTheme });

    if (user.username === data.username) {
      localStorage.setItem(CURRENT_USERNAME_KEY, user.username);
      await navigate(`/p/${user.username}`);
    }

    onClose();
  });

  return (
    <S.Overlay onClick={handleBackdropClick}>
      <S.Modal onClick={stopPropagation}>
        <S.Header>
          <div>
            <S.Title>{t("editProfile.title")}</S.Title>
            <S.Description>{t("editProfile.description")}</S.Description>
          </div>

          <S.CloseButton type="button" onClick={onClose} aria-label={t("common.closeSettings")}>
            <X size={16} />
          </S.CloseButton>
        </S.Header>

        <FormProvider {...form}>
          <S.Form onSubmit={handleSubmit}>
            <InputComponent
              defaultValue={defaultValues.nickname}
              placeholder={t("editProfile.nicknamePlaceholder")}
              label={t("editProfile.nicknameLabel")}
              name="nickname"
              type="text"
              logo={<UserCircle />}
            />

            <InputComponent
              defaultValue={defaultValues.username}
              placeholder={t("editProfile.usernamePlaceholder")}
              label={t("editProfile.usernameLabel")}
              name="username"
              type="text"
              logo={<UserCircle />}
            />

            <TextareaComponent
              placeholder={t("editProfile.bioPlaceholder")}
              label={t("editProfile.bioLabel")}
              name="bio"
              defaultValue={defaultValues.bio}
            />

            <S.SubmitButton
              type="submit"
              disabled={!isValid || isSubmitting}
              $isValid={isValid}
              $isSubmitting={isSubmitting}
            >
              {isSubmitting ? t("editProfile.submitLoading") : t("editProfile.submit")}
            </S.SubmitButton>
          </S.Form>
        </FormProvider>

        <S.ThemeSection>
          <S.Title>{t("editProfile.themeTitle")}</S.Title>

          <S.ThemeOptions>
            {userConstant.COLOR_OPTIONS.map((option) => {
              const isSelected = selectedTheme === option.id;

              return (
                <S.ColorOptionButton
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedTheme(option.id)}
                  aria-pressed={isSelected}
                  aria-label={t("editProfile.themeSelect", { theme: option.id })}
                  $background={option.background}
                  $accent={option.accent}
                  $selected={isSelected}
                />
              );
            })}
          </S.ThemeOptions>
        </S.ThemeSection>
      </S.Modal>
    </S.Overlay>
  );
}

export function EditProfileComponent({ defaultValues, identifier }: IEditProfileProps) {
  const { t } = useTranslation("profile");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {isOpen && <EditProfileModal onClose={closeModal} defaultValues={defaultValues} identifier={identifier} />}

      <S.FloatingButton onClick={openModal} aria-label={t("common.openSettings")}>
        <Settings />
      </S.FloatingButton>
    </>
  );
}
