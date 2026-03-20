import enAuth from "./locales/en/auth.json";
import enProfile from "./locales/en/profile.json";
import ptAuth from "./locales/pt/auth.json";
import ptProfile from "./locales/pt/profile.json";

const resources = {
  en: {
    auth: enAuth,
    profile: enProfile,
  },
  pt: {
    auth: ptAuth,
    profile: ptProfile,
  },
};

export const i18nConfig = {
  resources,
  fallbackLng: "en",
  supportedLngs: ["en", "pt"],
  ns: ["auth", "profile"],
  defaultNS: "auth",
  interpolation: { escapeValue: false },
  load: "languageOnly",
  detection: {
    order: ["localStorage", "navigator", "htmlTag"],
    caches: ["localStorage"],
  },
};
