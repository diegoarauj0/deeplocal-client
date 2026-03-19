import { createContext } from "react";

export type Theme = "dark" | "light";

interface IThemeContext {
  toggle: () => void;
  theme: Theme;
}

export const ThemeContext = createContext<IThemeContext>({ theme: "dark", toggle: () => {} });
