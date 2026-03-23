import { useTranslation } from "react-i18next";
import { useLinkManagementModeContext } from "../../contexts/linkManagementMode.context";
import * as S from "./toggleLinkManagementMode.style";
import { Edit3, X } from "lucide-react";

export function ToggleLinkManagementModeComponent({ isOwner }: { isOwner: boolean }) {
  const { isLinkManagementMode, enable, desabilitar } = useLinkManagementModeContext();
  const { t } = useTranslation("link");

  if (!isOwner) return null;

  const toggleEditMode = () => {
    if (isLinkManagementMode) return desabilitar();
    enable();
  };

  const icon = isLinkManagementMode ? <X /> : <Edit3 />;
  const text = isLinkManagementMode
    ? t("COMPONENTS.TOGGLE_LINK_MANAGEMENT_MODE.EXIT")
    : t("COMPONENTS.TOGGLE_LINK_MANAGEMENT_MODE.ENTER");

  return (
    <S.Button type="button" aria-pressed={isLinkManagementMode} onClick={toggleEditMode}>
      {icon}
      <span>{text}</span>
    </S.Button>
  );
}
