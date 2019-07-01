import { SupportedLocale } from "config/locale";

export type TranslationContent = Record<string, string>;

export type TranslationPerLocale = {
  [key in SupportedLocale]: TranslationContent;
};

export interface Message {
  id: string;
  description?: string;
  defaultMessage: string;
}
