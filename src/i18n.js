import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json"
import ka from "./locales/ka.json"

i18n.use(initReactI18next).init({
  lng: localStorage.getItem("lang") || "ka",
  fallbackLng: "en",
  resources: {
    en: {translation: en},
    ka: {translation: ka}
  }
})

export default i18n;