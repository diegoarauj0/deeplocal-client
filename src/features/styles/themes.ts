import type { Theme } from "./theme.context"

export interface ITheme {
  bg: {
    void: string
    dark: string
    normal: string
    light: string
  }
  highlight: string
  border: {
    normal: string
    muted: string
  }
  primary: {
    normal: string
    light: string
  }
  secondary: string
  danger: string
  warning: string
  success: string
  shadow: string
  info: string
  text: {
    normal: string
    muted: string
  }
}

export const Themes: Record<Theme, ITheme> = {
  dark: {
    bg: {
      void: "hsl(0, 0%, 0%)",
      dark: "hsl(336 0% 1%)",
      normal: "hsl(330 0% 4%)",
      light: "hsl(0 0% 9%)",
    },
    highlight: "hsl(330 0% 39%)",
    border: {
      normal: "hsl(0 0% 28%)",
      muted: "hsl(300 0% 18%)",
    },
    primary: {
      light: "hsl(127, 60%, 55%)",
      normal: "hsl(121 32% 65%)",
    },
    secondary: "hsl(297 40% 72%)",
    danger: "hsl(9 26% 64%)",
    warning: "hsl(52 19% 57%)",
    success: "hsl(146 17% 59%)",
    info: "hsl(217 28% 65%)",
    shadow: "hsla(0, 0%, 0%, 0.00)",
    text: {
      normal: "hsl(0 0% 95%)",
      muted: "hsl(300 0% 69%)",
    },
  },

  light: {
    bg: {
      void: "hsl(0, 0%, 100%)",
      dark: "hsl(0 0% 90%)",
      normal: "hsl(0 0% 95%)",
      light: "hsl(300 50% 100%)",
    },
    highlight: "hsl(300 50% 100%)",
    border: {
      normal: "hsl(300 0% 50%)",
      muted: "hsl(340 0% 62%)",
    },
    primary: {
      light: "#005F00",
      normal: "hsl(126 49% 22%)",
    },
    secondary: "hsl(296 34% 30%)",
    danger: "hsl(9 21% 41%)",
    warning: "hsl(52 23% 34%)",
    success: "hsl(147 19% 36%)",
    info: "hsl(217 22% 41%)",
    shadow: "hsla(0, 0%, 0%, 0.45)",
    text: {
      normal: "hsl(330 0% 4%)",
      muted: "hsl(0 0% 28%)",
    },
  },
}
