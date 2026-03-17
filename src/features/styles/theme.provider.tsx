import type { PropsWithChildren } from "react"
import { ThemeContext } from "./theme.context"
import * as styled from "styled-components"
import { Themes } from "./themes"

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeContext.Provider value={{ theme: "dark" }}>
      <styled.ThemeProvider theme={Themes["dark"]}>{children}</styled.ThemeProvider>
    </ThemeContext.Provider>
  )
}
