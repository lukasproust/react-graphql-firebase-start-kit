import {
  SupportedLocale,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE
} from "../../config/locale";
import normalizeLocale from "../intl/normalizeLocale";

import { ALLOWED_ID_PREFIX, ALLOWED_ID_SUFFIX } from "./constants";
import { TranslationContent, Message, TranslationPerLocale } from "./types";

/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const babel = require("@babel/core");
const path = require("path");
const fs = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require("glob");
// eslint-disable-next-line import/no-extraneous-dependencies
const chalk = require("chalk");

function reactIntlMessages(filePath: string) {
  // Tried with the async version with promises,
  // but no performance improvements
  const transformFileSync = babel.transformFileSync(filePath, {
    presets: ["@babel/preset-react", "@babel/preset-env", "@babel/typescript"],
    plugins: [
      "react-intl",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-class-properties"
    ]
  });
  if (transformFileSync === undefined || transformFileSync === null) {
    throw new Error("Not able to transform stuff");
  }
  // @ts-ignore
  return transformFileSync.metadata["react-intl"].messages;
}

function messagesFromIntlSourceFiles(): {
  [intlfilepath in string]: Message[];
} {
  const allJsFilePaths: string[] = glob.sync(
    path.join(__dirname, "../../../src/**/*intl.ts")
  );
  return allJsFilePaths.reduce((acc, filePath) => {
    const messages = reactIntlMessages(filePath);
    if (messages.length > 0) {
      return Object.assign(acc, { [filePath]: messages });
    }
    return acc;
  }, {});
}

export function defaultMessagesFromSources(): TranslationContent {
  const messagesByFile = messagesFromIntlSourceFiles();
  const defaultMessages: TranslationContent = {};

  Object.keys(messagesByFile).forEach(filePath => {
    const messages = messagesByFile[filePath];
    messages.forEach(message => {
      const { id } = message;
      defaultMessages[id] = message.defaultMessage;
    });
  });
  return defaultMessages;
}

export function translationFile(locale: SupportedLocale) {
  return path.join(__dirname, `../../locales/${normalizeLocale(locale)}.json`);
}

function translationFileContent(locale: SupportedLocale): TranslationContent {
  const filePath = translationFile(locale);
  let translation;
  try {
    translation = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    // translation file does not exists yet, do nothing
    translation = {};
  }
  return translation;
}

export function retrieveTranslationsPerLocale(): TranslationPerLocale {
  return SUPPORTED_LOCALES.reduce(
    (
      acc: { [key in SupportedLocale]: TranslationContent },
      locale: SupportedLocale
    ) => {
      acc[locale] = translationFileContent(locale);
      return acc;
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    { en_US: {}, fr_FR: {}, es_ES: {}, de_DE: {} }
  );
}

function idSetsAreEqual(arrayA: string[], setB: Set<string>) {
  if (arrayA.length !== setB.size) return false;
  return arrayA.findIndex(id => !setB.has(id)) < 0;
}

export function allLocaleTranslationsHaveIdenticalKeys(
  translationsPerLocale: TranslationPerLocale
) {
  const firstLocaleIds = new Set(
    Object.keys(translationsPerLocale[SUPPORTED_LOCALES[0]])
  );
  for (let i = 1; i < SUPPORTED_LOCALES.length; i += 1) {
    const localeIds = Object.keys(translationsPerLocale[SUPPORTED_LOCALES[i]]);
    if (!idSetsAreEqual(localeIds, firstLocaleIds)) {
      console.log(chalk.red("Translation files have different ids.\n")); // eslint-disable-line no-console
      return false;
    }
  }
  return true;
}

export function validateTranslationIdFormat(
  defaultMessages: TranslationContent
) {
  const errors: string[] = [];
  Object.keys(defaultMessages).forEach(translationID => {
    const parts = translationID.split(".");
    const description = parts[parts.length - 1].split("-");
    const suffix = description[description.length - 1];
    const prefix = parts[0];

    const isLowerId = translationID === translationID.toLowerCase();
    const hasUnderscore = translationID.includes("_");
    const hasValidPrefix = ALLOWED_ID_PREFIX.includes(prefix);
    const hasValidSuffix = ALLOWED_ID_SUFFIX.includes(suffix);
    const hasAloneSuffix = description.length === 1;

    if (hasUnderscore) {
      errors.push(`${translationID} contains underscore`);
    }
    if (hasAloneSuffix) {
      errors.push(`${translationID} needs a dash to separate suffix`);
    }
    if (!isLowerId) {
      errors.push(`${translationID} is not lowercase`);
    }
    if (!hasValidPrefix) {
      errors.push(`${translationID} has a non allowed prefix`);
    }
    if (!hasValidSuffix) {
      errors.push(`${translationID} has a non allowed suffix`);
    }
  });
  return errors;
}

export function mergeTranslationsAndDefaultMessages(
  localeTranslations: TranslationContent,
  defaultMessages: TranslationContent
): TranslationContent {
  const allIds = new Set([
    ...Object.keys(localeTranslations),
    ...Object.keys(defaultMessages)
  ]);
  const sortedIds = [...allIds].sort();
  const translations: TranslationContent = {};
  sortedIds.forEach(id => {
    translations[id] = localeTranslations[id] || defaultMessages[id];
  });
  return translations;
}

export function writeJsonFileSync(filePath: string, object: object) {
  return fs.writeFileSync(filePath, `${JSON.stringify(object, null, 2)}\n`);
}

export function printIds(
  title: string,
  ids: string[],
  texts: { [key: string]: string },
  otherTexts: { [key: string]: string } | undefined = undefined
) {
  if (ids.length > 0) {
    console.log(title); // eslint-disable-line no-console
    ids.forEach((id: string) => {
      const otherText = otherTexts ? ` vs "${otherTexts[id]}"` : "";
      console.log(` + ${id}: "${texts[id]}"${otherText}`); // eslint-disable-line no-console
    });
    console.log(); // eslint-disable-line no-console
  }
}

export const printRedundantTranslationTexts = (
  translationsPerLocale: TranslationPerLocale,
  defaultMessages: TranslationContent
) => {
  // TODO look for redundancy in ALL languages
  const defaultTranslation = translationsPerLocale[DEFAULT_LOCALE];
  const translations = mergeTranslationsAndDefaultMessages(
    defaultTranslation,
    defaultMessages
  );

  const nbOccurencesForText: { [key: string]: number } = {};
  Object.keys(translations).forEach(key => {
    const text = translations[key];
    nbOccurencesForText[text] = (nbOccurencesForText[text] || 0) + 1;
  });

  const THRESHOLD = 3;
  const redundantTranslationTexts = Object.keys(nbOccurencesForText).filter(
    text => nbOccurencesForText[text] > THRESHOLD
  );

  if (redundantTranslationTexts.length > 0) {
    // eslint-disable-next-line no-console
    console.log(
      chalk.yellow(`Redundant translation texts in ${DEFAULT_LOCALE}.json:`)
    );
    redundantTranslationTexts.forEach(text => {
      // eslint-disable-next-line no-console
      console.log(`  "${text}" (${nbOccurencesForText[text]} times)`);
    });
    console.log(); // eslint-disable-line no-console
    return false;
  }
  return true;
};
