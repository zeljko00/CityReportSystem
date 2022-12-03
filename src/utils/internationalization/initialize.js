import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import latin from "./latin.json";
import cyrillic from "./cyrillic.json";

export const supportedLanguages = ["latin", "cyrillic"];

const initializeI18N = () => {
  i18n.use(initReactI18next).init({
    resources: {
      latin: {
        translation: latin,
      },
      cyrillic: {
        translation: cyrillic,
      },
    },
    lng: localStorage.getItem("language"),
    fallbackLng: "latin",
  });

  // debug
  console.log("i18n initialized!");
};

export default initializeI18N;
