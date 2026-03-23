import { ThemeContext, type ThemeType, type CurrentTheme } from "./theme.context";
import { useState, type PropsWithChildren } from "react";
import * as styled from "styled-components";
import { baseThemes } from "../themes";

const CURRENT_THEME_TYPE_KEY = "THEME_TYPE";

export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = localStorage.getItem(CURRENT_THEME_TYPE_KEY);

  const [currentThemeType, setCurrentThemeType] = useState<ThemeType>(theme === null ? "system" : (theme as ThemeType));

  const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const systemTheme = isDarkMode ? "dark" : "light";

  const [currentTheme, setCurrentTheme] = useState<CurrentTheme>(
    currentThemeType === "system" ? systemTheme : currentThemeType,
  );

  const themes = baseThemes[currentTheme];

  const setThemeType = (theme: ThemeType) => {
    setCurrentThemeType(() => {
      const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const systemTheme = isDarkMode ? "dark" : "light";

      localStorage.setItem(CURRENT_THEME_TYPE_KEY, theme);

      setCurrentTheme(theme === "system" ? systemTheme : theme);

      return theme;
    });
  };

  const toggleTheme = () => {
    const next: ThemeType = currentTheme === "dark" ? "light" : "dark";
    setThemeType(next);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setThemeType,
        themeProps: themes,
        themeType: currentThemeType,
        systemTheme,
        theme: currentTheme,
        toggle: toggleTheme,
      }}
    >
      <styled.ThemeProvider theme={themes}>{children}</styled.ThemeProvider>
    </ThemeContext.Provider>
  );
}
