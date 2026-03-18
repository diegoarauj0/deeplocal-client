import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import pt from "./locales/pt-br.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: en, "pt-BR": pt },
    fallbackLng: "en",
    supportedLngs: ["en", "pt-BR"],
    ns: ["auth"],
    defaultNS: "auth",
    interpolation: { escapeValue: false },
    detection: {
      order: [ "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
