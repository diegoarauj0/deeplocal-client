import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import * as S from "./settingsLink.style";

export function SettingsLinkComponent() {
  const { t } = useTranslation("profile");

  const label = t("COMPONENTS.EDIT_PROFILE.TITLE");

  return (
    <S.FloatingLink to="/settings" aria-label={label} title={label}>
      <SlidersHorizontal />
    </S.FloatingLink>
  );
}
