import { PopupContext } from "../../../shared/contexts/popup.context";
import { CreateLinkModalComponent } from "./createLinkModal";
import { useTranslation } from "react-i18next";
import * as S from "./createLink.style";
import { Plus } from "lucide-react";
import { useContext } from "react";

export interface InterfaceCreateLinkTriggerProps {
  isOwner: boolean
  userId: string;
}

export function CreateLinkTriggerComponent({ userId, isOwner }: InterfaceCreateLinkTriggerProps) {
  const { openPopup } = useContext(PopupContext);
  const { t } = useTranslation("link");

  const openModal = () => {
    openPopup(
      <CreateLinkModalComponent userId={userId} />,
      t("COMPONENTS.CREATE_LINK.TITLE"),
      t("COMPONENTS.CREATE_LINK.DESCRIPTION"),
    );
  };

  if (!isOwner) return null

  return (
    <S.TriggerButton type="button" onClick={openModal} aria-label={t("COMPONENTS.CREATE_LINK.TRIGGER")}>
      <Plus />
      <span>{t("COMPONENTS.CREATE_LINK.TRIGGER")}</span>
    </S.TriggerButton>
  );
}
