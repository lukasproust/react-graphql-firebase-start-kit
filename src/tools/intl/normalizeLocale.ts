import { SupportedLocale } from "config/locale";

const normalizeLocale = (locale: SupportedLocale) =>
  locale.replace("_", "-").toLowerCase();

export default normalizeLocale;
