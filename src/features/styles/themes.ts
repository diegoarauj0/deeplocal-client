export type ThemeMode = "light" | "dark";
export type ThemeVariant = "red" | "blue" | "green" | "yellow" | "pink" | "purple" | "orange";

type ColorScale = {
  normal: string;
  light: string;
};

type TextScale = {
  normal: string;
  muted: string;
};

type BorderScale = {
  normal: string;
  muted: string;
};

export interface ITheme {
  bg: ColorScale & { void: string; dark: string };
  primary: ColorScale;
  highlight: string;

  text: TextScale;
  border: BorderScale;

  secondary: string;
  danger: string;
  warning: string;
  success: string;
  info: string;

  shadow: string;
}

export const baseThemes: Record<ThemeMode, ITheme> = {
  dark: {
    bg: {
      void: "hsl(0 0% 0%)",
      dark: "hsl(0 0% 5%)",
      normal: "hsl(0 0% 8%)",
      light: "hsl(0 0% 12%)",
    },
    text: {
      normal: "hsl(0 0% 95%)",
      muted: "hsl(0 0% 65%)",
    },
    secondary: "hsl(280 30% 60%)",
    danger: "hsl(0 60% 60%)",
    warning: "hsl(40 60% 60%)",
    success: "hsl(140 50% 50%)",
    info: "hsl(210 60% 60%)",
    shadow: "hsla(0 0% 0% / 0)",
    highlight: "hsl(330 0% 39%)",
    border: { normal: "hsl(0 0% 28%)", muted: "hsl(300 0% 18%)" },
    primary: { light: "hsl(127, 60%, 55%)", normal: "hsl(121 32% 65%)" },
  },

  light: {
    bg: {
      void: "hsl(0 0% 100%)",
      dark: "hsl(0 0% 90%)",
      normal: "hsl(0 0% 95%)",
      light: "hsl(0 0% 98%)",
    },
    text: {
      normal: "hsl(0 0% 10%)",
      muted: "hsl(0 0% 40%)",
    },
    secondary: "hsl(280 30% 40%)",
    danger: "hsl(0 50% 45%)",
    warning: "hsl(40 50% 45%)",
    success: "hsl(140 40% 40%)",
    info: "hsl(210 50% 45%)",
    shadow: "hsla(0 0% 0% / 0.2)",
    highlight: "hsl(300 50% 100%)",
    border: { normal: "hsl(300 0% 50%)", muted: "hsl(340 0% 62%)" },
    primary: { light: "#005F00", normal: "hsl(126 49% 22%)" },
  },
};

const createVariant = (hue: number, text: ThemeMode) => ({
  primary: {
    light: `hsl(${hue} 70% 60%)`,
    normal: `hsl(${hue} 60% 50%)`,
    dark: `hsl(${hue} 60% 40%)`,
  },
  highlight: `hsl(${hue} 80% 55%)`,
  border: {
    normal: `hsl(${hue} 30% 40%)`,
    muted: `hsl(${hue} 20% 25%)`,
  },
  text: text === "light" ? baseThemes.light.text : baseThemes.dark.text,
  bg: {
    dark: `hsl(${hue} 100% 5%)`,
    normal: `hsl(${hue} 100% 8%)`,
    light: `hsl(${hue} 100% 12%)`,
  },
});

export const variants: Record<ThemeVariant, ReturnType<typeof createVariant>> = {
  red: createVariant(0, "dark"),
  blue: createVariant(220, "dark"),
  green: createVariant(140, "dark"),
  yellow: createVariant(65, "dark"),
  orange: createVariant(30, "dark"),
  purple: createVariant(270, "dark"),
  pink: createVariant(335, "dark"),
};
