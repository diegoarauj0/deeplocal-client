import enAuth from "./locales/en/auth.json";
import enProfile from "./locales/en/profile.json";
import enLink from "./locales/en/link.json";
import ptAuth from "./locales/pt/auth.json";
import ptProfile from "./locales/pt/profile.json";
import ptLink from "./locales/pt/link.json";

const resources = {
  en: {
    auth: enAuth,
    profile: enProfile,
    link: enLink,
  },
  pt: {
    auth: ptAuth,
    profile: ptProfile,
    link: ptLink,
  },
};

export const i18nConfig = {
  resources,
  fallbackLng: "en",
  supportedLngs: ["en", "pt"],
  ns: ["auth", "profile", "link"],
  defaultNS: "auth",
  interpolation: { escapeValue: false },
  load: "languageOnly",
  detection: {
    order: ["localStorage", "navigator", "htmlTag"],
    caches: ["localStorage"],
  },
};
