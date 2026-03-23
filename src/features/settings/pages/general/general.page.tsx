import { useThemeContext, type ThemeType } from "../../../styles/contexts/theme.context";
import { Panel, PanelHeader, PanelTitle, PanelSubtitle } from "../panel.style";
import { useTranslation } from "react-i18next";
import * as S from "./general.page.style";
import { useState } from "react";

const languageOptions = [
  { value: "en", labelKey: "PAGES.GENERAL.LANGUAGE.OPTIONS.ENGLISH" },
  { value: "pt", labelKey: "PAGES.GENERAL.LANGUAGE.OPTIONS.PORTUGUESE" },
];

const themeOptions: { name: ThemeType; labelKey: string }[] = [
  { name: "system", labelKey: "PAGES.GENERAL.THEME.OPTIONS.SYSTEM" },
  { name: "light", labelKey: "PAGES.GENERAL.THEME.OPTIONS.LIGHT" },
  { name: "dark", labelKey: "PAGES.GENERAL.THEME.OPTIONS.DARK" },
];

export function GeneralSettingsPage() {
  const { themeType, setThemeType, systemTheme } = useThemeContext();
  const { i18n, t } = useTranslation("settings");

  const [language, setLanguage] = useState<string>(i18n.language || "en");
  const [theme, setTheme] = useState<ThemeType>(themeType);

  const handleTheme = (theme: ThemeType) => {
    setTheme(theme);
    setThemeType(theme);
  };

  const handleLanguage = async (language: string) => {
    setLanguage(language);
    await i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };

  return (
    <S.Page>
      <Panel>
        <PanelHeader>
          <PanelTitle>{t("PAGES.GENERAL.LANGUAGE.TITLE")}</PanelTitle>
          <PanelSubtitle>{t("PAGES.GENERAL.LANGUAGE.SUBTITLE")}</PanelSubtitle>
        </PanelHeader>
        <S.ControlGroup>
          <S.ControlLabel>{t("PAGES.GENERAL.LANGUAGE.LABEL")}</S.ControlLabel>
          <S.Select value={language} onChange={(e) => handleLanguage(e.target.value)}>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.labelKey)}
              </option>
            ))}
          </S.Select>
          <S.HelperText>{t("PAGES.GENERAL.LANGUAGE.HELPER")}</S.HelperText>
        </S.ControlGroup>
      </Panel>

      <Panel>
        <PanelHeader>
          <PanelTitle>{t("PAGES.GENERAL.THEME.TITLE")}</PanelTitle>
          <PanelSubtitle>{t("PAGES.GENERAL.THEME.SUBTITLE")}</PanelSubtitle>
        </PanelHeader>
        <S.ControlGroup>
          <S.ControlLabel>{t("PAGES.GENERAL.THEME.LABEL")}</S.ControlLabel>
          <S.Select value={theme} onChange={(e) => handleTheme(e.target.value as ThemeType)}>
            {themeOptions.map((option) => (
              <option key={option.name} value={option.name}>
                {t(option.labelKey)}
              </option>
            ))}
          </S.Select>
          <S.HelperText>
            {t("PAGES.GENERAL.THEME.HELPER", {
              mode: t(
                systemTheme === "dark" ? "PAGES.GENERAL.THEME.DETECTED.DARK" : "PAGES.GENERAL.THEME.DETECTED.LIGHT",
              ),
            })}
          </S.HelperText>
        </S.ControlGroup>
      </Panel>
    </S.Page>
  );
}
