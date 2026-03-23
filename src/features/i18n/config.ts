import enAuth from "./locales/en/auth.json";
import enProfile from "./locales/en/profile.json";
import enLink from "./locales/en/link.json";
import enSettings from "./locales/en/settings.json";
import ptAuth from "./locales/pt/auth.json";
import ptProfile from "./locales/pt/profile.json";
import ptLink from "./locales/pt/link.json";
import ptSettings from "./locales/pt/settings.json";

const resources = {
  en: {
    auth: enAuth,
    profile: enProfile,
    link: enLink,
    settings: enSettings,
  },
  pt: {
    auth: ptAuth,
    profile: ptProfile,
    link: ptLink,
    settings: ptSettings,
  },
};

export const i18nConfig = {
  resources,
  fallbackLng: "en",
  supportedLngs: ["en", "pt"],
  ns: ["auth", "profile", "link", "settings"],
  defaultNS: "auth",
  interpolation: { escapeValue: false },
  detection: {
    order: ["localStorage", "navigator", "htmlTag"],
    caches: ["localStorage"],
  },
};
