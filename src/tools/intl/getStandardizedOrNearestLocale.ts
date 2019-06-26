import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  SupportedLocale
} from "config/locale";

const getStandardizedOrNearestLocale = (locale: string): SupportedLocale => {
  let formattedLocale = locale.replace("-", "_").toLowerCase();

  if (formattedLocale.includes("_")) {
    const formattedLocaleParts = formattedLocale.split("_");
    formattedLocaleParts[1] = formattedLocaleParts[1].toUpperCase();
    formattedLocale = formattedLocaleParts.join("_");
  } else {
    formattedLocale = `${formattedLocale}_${formattedLocale.toUpperCase()}`;
  }

  const isTranslated = SUPPORTED_LOCALES.includes(
    formattedLocale as SupportedLocale
  );

  if (isTranslated) {
    return formattedLocale as SupportedLocale;
  }

  const firstPart = formattedLocale.split("_")[0];
  const nearestLocale = SUPPORTED_LOCALES.filter(supportedLocale => {
    return supportedLocale.includes(firstPart);
  });

  if (nearestLocale.length) {
    return nearestLocale[0];
  }

  return DEFAULT_LOCALE;
};

export default getStandardizedOrNearestLocale;
