import { DEFAULT_LOCALE } from "config/locale";
import normalizeLocale from "./normalizeLocale";
import getStandardizedOrNearestLocale from "./getStandardizedOrNearestLocale";

const getUserLocale = () => {
  const userLanguageStorage = localStorage.getItem("USER_LANGUAGE");

  return userLanguageStorage
    ? normalizeLocale(getStandardizedOrNearestLocale(userLanguageStorage))
    : normalizeLocale(DEFAULT_LOCALE);
};

export default getUserLocale;
