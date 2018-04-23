process.env.NODE_ENV = 'development';

const fs = require('fs');
const glob = require('glob');
const path = require('path');
const babel = require('babel-core'); // eslint-disable-line import/no-extraneous-dependencies
const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies
const config = require('../config/env')().raw;

const LOCALES = config.TRANSLATION_LOCALES.split(',');
const DEFAULT_LOCALE = LOCALES[0];

function reactIntlMessages(filePath) {
  // Tried with the async version with promises,
  // but no performance improvements
  return babel.transformFileSync(filePath, {
    presets: ['react', 'env'],
    plugins: [
      'react-intl',
      'transform-object-rest-spread',
      'transform-class-properties',
    ],
  }).metadata['react-intl'].messages;
}

function messagesFromComponents(filePaths) {
  return filePaths.reduce((acc, filePath) => {
    const messages = reactIntlMessages(filePath);
    if (messages.length > 0) {
      return Object.assign(acc, { [filePath]: messages });
    }
    return acc;
  }, {});
}

function validateTranslationIdFormat(defaultMessages) {
  const errors = [];
  Object.keys(defaultMessages).forEach(translationID => {
    const isLowerId = translationID === translationID.toLowerCase();
    const hasUnderscore = translationID.includes('_');

    if (hasUnderscore) {
      errors.push(`${translationID} contains underscore$`);
    }
    if (!isLowerId) {
      errors.push(`${translationID} is not lowercase`);
    }

    if (errors.length) {
      console.log(chalk.blue('ID naming errors were found'));
      errors.forEach(error => console.log(chalk.red(error)));
      console.log(chalk.blue('Aborting Extraction'));
      process.exit();
    }
  });
}

function translationFile(locale) {
  return path.join(__dirname, `../locales/${locale}.json`);
}

function messageTranslations(locale) {
  const filePath = translationFile(locale);

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    // translation file does not exists yet, do nothing
    return {};
  }
}

function idSetsAreEqual(arrayA, setB) {
  if (arrayA.length !== setB.size) return false;
  return arrayA.findIndex(id => !setB.has(id)) < 0;
}

function allLocaleTranslationsHaveIdenticalKeys(translationsPerLocale) {
  const firstLocaleIds = new Set(
    Object.keys(translationsPerLocale[LOCALES[0]]),
  );
  for (let i = 1; i < LOCALES.length; i++) {
    const localeIds = Object.keys(translationsPerLocale[LOCALES[i]]);

    if (!idSetsAreEqual(localeIds, firstLocaleIds)) {
      console.log(chalk.red('Translation files have different ids.\n')); // eslint-disable-line no-console
      return false;
    }
  }
  return true;
}

function printIds(title, ids, texts, otherTexts = undefined) {
  if (ids.length > 0) {
    console.log(title);
    ids.forEach(id => {
      const otherText = otherTexts ? ` vs "${otherTexts[id]}"` : '';
      console.log(` + ${id}: "${texts[id]}"${otherText}`);
    });
    console.log();
  }
}

function mergeTranslationsAndDefaultMessages(
  localeTranslations,
  defaultMessages,
) {
  const allIds = new Set([
    ...Object.keys(localeTranslations),
    ...Object.keys(defaultMessages),
  ]);
  const sortedIds = [...allIds].sort();
  const translations = {};
  sortedIds.forEach(
    id => (translations[id] = localeTranslations[id] || defaultMessages[id]),
  );
  return translations;
}

function writeJsonFileSync(filePath, object) {
  return fs.writeFileSync(filePath, `${JSON.stringify(object, null, 2)}\n`);
}

const allJsFilePaths = glob.sync(path.join(__dirname, '../**/*.js'));
const applicationMessagesByFile = messagesFromComponents(allJsFilePaths);
let canUpdateTranslationFiles = true;

const duplicatedIds = new Set();
const defaultMessages = {};

// Build messages and identify duplicates ids
Object.keys(applicationMessagesByFile).forEach(filePath => {
  const messages = applicationMessagesByFile[filePath];
  messages.forEach(message => {
    if (defaultMessages[message.id]) {
      duplicatedIds.add(message.id);
    }
    defaultMessages[message.id] = message.defaultMessage;
  });
});

// Catch translations errors
validateTranslationIdFormat(defaultMessages);

// Get locales
const translationsPerLocale = LOCALES.reduce((acc, locale) => {
  acc[locale] = messageTranslations(locale); // eslint-disable-line no-param-reassign
  return acc;
}, {});

canUpdateTranslationFiles = allLocaleTranslationsHaveIdenticalKeys(
  translationsPerLocale,
);

const defaultTranslation = translationsPerLocale[DEFAULT_LOCALE];
const translatedIds = Object.keys(defaultTranslation);
const translatedIdsSet = new Set(translatedIds);

const defaultMessagesIds = Object.keys(defaultMessages);
const defaultMessagesIdsSet = new Set(defaultMessagesIds);

const unusedIds = translatedIds.filter(id => !defaultMessagesIdsSet.has(id));
printIds(
  chalk.red(`Unused translations in ${DEFAULT_LOCALE}.json:`),
  unusedIds,
  defaultTranslation,
);

canUpdateTranslationFiles = unusedIds.length === 0;

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
  LOCALES.forEach(locale => {
    const translations = mergeTranslationsAndDefaultMessages(
      translationsPerLocale[locale],
      defaultMessages,
    );
    writeJsonFileSync(translationFile(locale), translations);
  });
  console.log(chalk.green('All translation files updated.'));
} else {
  console.log(
    chalk.red(
      'Translation files *NOT* updated, fix above errors and run again.',
    ),
  );
  process.env.CI && process.exit(1); // eslint-disable-line no-unused-expressions
}
