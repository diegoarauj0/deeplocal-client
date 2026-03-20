export const userConstant = {
  EMAIL_LENGTH_MIN: 1,
  EMAIL_LENGTH_MAX: 255,
  USERNAME_LENGTH_MIN: 3,
  USERNAME_LENGTH_MAX: 16,
  BIO_LENGTH_MIN: 1,
  BIO_LENGTH_MAX: 300,
  NICKNAME_LENGTH_MIN: 3,
  NICKNAME_LENGTH_MAX: 16,
  PASSWORD_LENGTH_MIN: 8,
  PASSWORD_LENGTH_MAX: 128,
  AVATAR_CONTENT_TYPE: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  BACKGROUND_CONTENT_TYPE: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  COLOR_OPTIONS: [
    {
      id: "red",
      background: "linear-gradient(hsl(0 60% 50%), hsl(0 100% 10%))",
      accent: "hsl(0 100% 10%)",
    },
    {
      id: "blue",
      background: "linear-gradient(hsl(220 60% 50%), hsl(220 100% 10%))",
      accent: "hsl(220 100% 10%)",
    },
    {
      id: "green",
      background: "linear-gradient(hsl(140 60% 50%), hsl(140 100% 10%))",
      accent: "hsl(140 100% 10%)",
    },
    {
      id: "yellow",
      background: "linear-gradient(hsl(65 60% 50%), hsl(65 100% 10%))",
      accent: "hsl(65 100% 10%)",
    },
    {
      id: "orange",
      background: "linear-gradient(hsl(30 60% 50%), hsl(30 100% 10%))",
      accent: "hsl(30 100% 10%)",
    },
    {
      id: "purple",
      background: "linear-gradient(hsl(270 60% 50%), hsl(270 100% 10%))",
      accent: "hsl(270 100% 10%)",
    },
    {
      id: "pink",
      background: "linear-gradient(hsl(335 60% 50%), hsl(335 100% 10%))",
      accent: "hsl(335 100% 10%)",
    },
  ],
};
