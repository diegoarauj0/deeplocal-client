import { createContext, useContext } from "react";
import type { InterfaceTheme } from "../themes";

export type CurrentTheme = "dark" | "light";

export type ThemeType = "dark" | "light" | "system";

interface InterfaceThemeContext {
  setThemeType: (type: ThemeType) => void;
  themeProps: InterfaceTheme;
  currentTheme: CurrentTheme;
  themeType: ThemeType;
  systemTheme: "dark" | "light";
  theme: CurrentTheme;
  toggle: () => void;
}

export const ThemeContext = createContext<InterfaceThemeContext>({
  themeProps: {} as InterfaceTheme,
  setThemeType: () => {},
  currentTheme: "dark",
  themeType: "system",
  systemTheme: "dark",
  theme: "dark",
  toggle: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);
