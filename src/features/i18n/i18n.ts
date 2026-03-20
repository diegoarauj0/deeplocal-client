import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { i18nConfig } from "./config";
import i18n from "i18next";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .init({ ...i18nConfig } as any);

export default i18n;
