import { PopupContext } from "../../../shared/contexts/popup.context";
import { UploadAvatarModalComponent } from "./uploadAvatarModal";
import { useTranslation } from "react-i18next";
import { Upload } from "lucide-react";
import { useContext } from "react";

interface InterfaceEditAvatarTrigger {
  profileOwner: boolean;
  identifier: string;
}

export function ProfileAvatarTriggerComponent({ profileOwner, identifier }: InterfaceEditAvatarTrigger) {
  const { openPopup } = useContext(PopupContext);
  const { t } = useTranslation("profile");

  if (!profileOwner) return null;

  const openModal = () => {
    openPopup(<UploadAvatarModalComponent identifier={identifier} />, t("COMPONENTS.PROFILE_AVATAR.TITLE"), t("COMPONENTS.PROFILE_AVATAR.DESCRIPTION"));
  };

  return <Upload onClick={openModal} />;
}
