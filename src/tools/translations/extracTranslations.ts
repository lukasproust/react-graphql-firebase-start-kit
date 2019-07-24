import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../../config/locale';
import {
  allLocaleTranslationsHaveIdenticalKeys,
  defaultMessagesFromSources,
  translationFile,
  retrieveTranslationsPerLocale,
  validateTranslationIdFormat,
  mergeTranslationsAndDefaultMessages,
  writeJsonFileSync,
  printIds,
  printRedundantTranslationTexts,
} from './utils';

/* eslint-disable no-bitwise */
/* eslint-disable no-console */
process.env.NODE_ENV = 'development';

/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const chalk = require('chalk');

let canUpdateTranslationFiles = true;

const defaultMessages = defaultMessagesFromSources();

const errors = validateTranslationIdFormat(defaultMessages);
if (errors.length) {
  console.log(chalk.blue('ID naming errors were found'));
  errors.forEach(error => console.log(chalk.red(error)));
  console.log(chalk.blue('Aborting Extraction'));
  process.exit();
}

const translationsPerLocale = retrieveTranslationsPerLocale();

printRedundantTranslationTexts(translationsPerLocale, defaultMessages);

// @ts-ignore '&=' operator
canUpdateTranslationFiles &= allLocaleTranslationsHaveIdenticalKeys(
  translationsPerLocale,
);

const defaultTranslation = translationsPerLocale[DEFAULT_LOCALE];
const translatedIds = Object.keys(defaultTranslation);
const translatedIdsSet = new Set(translatedIds);

const defaultMessagesIds = Object.keys(defaultMessages);
const defaultMessagesIdsSet = new Set(defaultMessagesIds);

// const unusedIds = filterRelevantTranslations(
//   translatedIds.filter(id => !defaultMessagesIdsSet.has(id))
// );
const unusedIds = translatedIds.filter(id => !defaultMessagesIdsSet.has(id));

printIds(
  chalk.red(`Unused translations in ${DEFAULT_LOCALE}.json:`),
  unusedIds,
  defaultTranslation,
);

// @ts-ignore '&=' operator
canUpdateTranslationFiles &= unusedIds.length === 0;

const outdatedTranslationIds = defaultMessagesIds.filter(
  id =>
    translatedIdsSet.has(id) && defaultMessages[id] !== defaultTranslation[id],
);
printIds(
  chalk.yellow('Outdated default messages:'),
  outdatedTranslationIds,
  defaultTranslation,
  defaultMessages,
);

const newIds = defaultMessagesIds.filter(id => !translatedIdsSet.has(id));
printIds(chalk.green('New translation ids:'), newIds, defaultMessages);

if (canUpdateTranslationFiles) {
  SUPPORTED_LOCALES.forEach(locale => {
    const translations = mergeTranslationsAndDefaultMessages(
      translationsPerLocale[locale],
      defaultMessages,
    );
    writeJsonFileSync(translationFile(locale), translations);
  });
  console.log(chalk.green('All translation files updated.')); // eslint-disable-line no-console
} else {
  console.log(
    chalk.red(
      'Translation files *NOT* updated, fix above errors and run again.',
    ),
  ); // eslint-disable-line no-console
  process.env.CI && process.exit(1); // eslint-disable-line no-unused-expressions
}
