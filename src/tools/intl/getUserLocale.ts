import { DEFAULT_LOCALE, SupportedLocale } from "config/locale";

import getStandardizedOrNearestLocale from "./getStandardizedOrNearestLocale";

const getUserLocale = (): SupportedLocale => {
  const userLanguageStorage = localStorage.getItem("USER_LANGUAGE");

  return userLanguageStorage
    ? getStandardizedOrNearestLocale(userLanguageStorage)
    : DEFAULT_LOCALE;
};

export default getUserLocale;
