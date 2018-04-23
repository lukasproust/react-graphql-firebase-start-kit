import { AVAILABLE_LOCALES } from 'config/ui';

export const DEFAULT_LOCALE = AVAILABLE_LOCALES.en_US;

export const normalizeLocale = locale => locale.replace('_', '-').toLowerCase();

export const getUserLanguage = () => {
  return localStorage.getItem('USER_LANGUAGE')
    ? localStorage.getItem('USER_LANGUAGE')
    : normalizeLocale(DEFAULT_LOCALE);
};

export const getStandardizedLocale = locale => {
  if (typeof locale !== 'string') {
    return DEFAULT_LOCALE;
  }

  const availableLocales = Object.keys(AVAILABLE_LOCALES).map(
    key => AVAILABLE_LOCALES[key],
  );
  let formattedLocale = locale.replace('-', '_').toLowerCase();

  if (formattedLocale.includes('_')) {
    formattedLocale = formattedLocale.split('_');
    formattedLocale[1] = formattedLocale[1].toUpperCase();
    formattedLocale = formattedLocale.join('_');
  } else {
    formattedLocale = `${formattedLocale}_${formattedLocale.toUpperCase()}`;
  }

  const isTranslated = availableLocales.includes(formattedLocale);

  if (isTranslated) {
    return formattedLocale;
  }

  const nearestLocale = availableLocales.filter(availableLocale => {
    const firstPart = formattedLocale.split('_')[0];
    return availableLocale.includes(firstPart);
  });

  if (nearestLocale.length) {
    return nearestLocale[0];
  }

  return DEFAULT_LOCALE;
};
