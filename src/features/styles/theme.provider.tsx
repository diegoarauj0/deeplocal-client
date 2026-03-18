import type { PropsWithChildren } from "react";
import { ThemeContext } from "./theme.context";
import * as styled from "styled-components";
import { Themes } from "./themes";

export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = Themes["dark"]

  return (
    <ThemeContext.Provider value={{ theme: "dark" }}>
      <styled.ThemeProvider theme={theme}>{children}</styled.ThemeProvider>
    </ThemeContext.Provider>
  );
}
