import { ThemeContext, type Theme } from "./theme.context";
import { useState, type PropsWithChildren } from "react";
import * as styled from "styled-components";
import { baseThemes } from "./themes";

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>("dark");

  const themes = baseThemes[theme];

  const toggle = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <styled.ThemeProvider theme={themes}>{children}</styled.ThemeProvider>
    </ThemeContext.Provider>
  );
}
