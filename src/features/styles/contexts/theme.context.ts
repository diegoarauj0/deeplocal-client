import { createContext, useContext } from "react";
import type { InterfaceTheme } from "../themes";

export type Theme = "dark" | "light";

interface InterfaceThemeContext {
  themeProps: InterfaceTheme;
  toggle: () => void;
  theme: Theme;
}

export const ThemeContext = createContext<InterfaceThemeContext>({
  theme: "dark",
  toggle: () => {},
  themeProps: {} as InterfaceTheme,
});

export const useThemeContext = () => useContext(ThemeContext);
