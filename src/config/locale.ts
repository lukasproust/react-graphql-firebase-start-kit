/* Available languages list */

export const LOCALE_EN_US = 'en_US';
export const LOCALE_FR_FR = 'fr_FR';

export const SUPPORTED_LOCALES = [LOCALE_EN_US, LOCALE_FR_FR];

export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: SupportedLocale = LOCALE_EN_US;
