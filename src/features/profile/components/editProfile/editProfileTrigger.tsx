import { PopupContext } from "../../../shared/contexts/popup.context";
import type { ColorUser } from "../../../shared/deeplocal.http";
import { EditProfileModalComponent } from "./editProfileModal";
import { useTranslation } from "react-i18next";
import * as S from "./editProfile.style";
import { Settings } from "lucide-react";
import { useContext } from "react";

export interface InterfaceDefaultValues {
  username?: string;
  nickname?: string;
  color?: ColorUser;
  bio?: string;
}

export interface InterfaceEditProfileTriggerProps {
  defaultValues: InterfaceDefaultValues;
  identifier: string;
}

export function EditProfileTriggerComponent({ defaultValues, identifier }: InterfaceEditProfileTriggerProps) {
  const { openPopup } = useContext(PopupContext);
  const { t } = useTranslation("profile");

  const openModal = () => {
    openPopup(
      <EditProfileModalComponent defaultValues={defaultValues} identifier={identifier} />,
      t("COMPONENTS.EDIT_PROFILE.TITLE"),
      t("COMPONENTS.EDIT_PROFILE.DESCRIPTION"),
    );
  };

  return (
    <S.FloatingButton onClick={openModal} aria-label={t("common.openSettings")}>
      <Settings />
    </S.FloatingButton>
  );
}
