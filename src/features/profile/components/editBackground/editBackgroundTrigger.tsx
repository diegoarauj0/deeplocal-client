import { PopupContext } from "../../../shared/contexts/popup.context";
import { EditBackgroundModalComponent } from "./editBackgroundModal";
import { useTranslation } from "react-i18next";
import * as S from "./editBackground.style";
import { Upload } from "lucide-react";
import { useContext } from "react";

export interface IEditBackgroundTriggerProps {
  identifier: string;
}

export function EditBackgroundTrigger({ identifier }: IEditBackgroundTriggerProps) {
  const { openPopup } = useContext(PopupContext);
  const { t } = useTranslation("profile");

  const openModal = () => {
    openPopup(
      <EditBackgroundModalComponent identifier={identifier} />,
      t("COMPONENTS.EDIT_BACKGROUND.TITLE"),
      t("COMPONENTS.EDIT_BACKGROUND.DESCRIPTION"),
    );
  };

  return (
    <S.FloatingButton onClick={openModal}>
      <Upload />
    </S.FloatingButton>
  );
}
