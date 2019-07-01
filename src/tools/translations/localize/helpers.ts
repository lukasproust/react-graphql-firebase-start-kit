import chalk from "chalk"; // eslint-disable-line import/no-extraneous-dependencies
import request from "request-promise-native"; // eslint-disable-line import/no-extraneous-dependencies
import fs from "fs";
import path from "path";

import { PRIVATE_KEYS } from "../../../config/keys";

export const getLocalAssets = () => {
  const filePath = path.join(__dirname, "../../../locales/en-us.json");

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    // translation file does not exists yet, do nothing
    return {};
  }
};

const getAssetsByNamespace = (namespace: string) => {
  const messages = getLocalAssets();
  const regexNamespace = `^${namespace}.`;
  const newObj = {};
  Object.keys(messages)
    .filter(key => new RegExp(regexNamespace).test(key))
    .forEach(key => {
      newObj[key] = messages[key];
    });

  return newObj;
};

const getTagFromTranslationKey = (key: string) => {
  const splittedKey = key.split(".");
  const tag = splittedKey[0] || undefined;
  return tag;
};

const convertToLocalizeEntities = translations =>
  Object.keys(translations).map(translationKey => ({
    id: translationKey,
    name: translations[translationKey],
    tag: getTagFromTranslationKey(translationKey),
    locale: "en-us"
  }));

export const apiRequest = (endpoint: string, options = undefined) => {
  const uri = `https://localise.biz/api/${endpoint}`;
  const reqOptions = Object.assign(
    {
      uri,
      headers: {
        Authorization: `Loco ${PRIVATE_KEYS.loco}`
      },
      json: true
    },
    options
  );

  return request(reqOptions);
};

export const getNewAssets = locoTrans => {
  return new Promise(resolve => {
    const translations = getLocalAssets();
    const newKeys = Object.keys(translations)
      .filter(localKey => {
        const keyExists = locoTrans.reduce(
          (acc, translation) => translation.id === localKey || acc === true,
          false
        );
        return !keyExists;
      })
      .reduce((acc, key) => {
        acc[key] = translations[key];
        return acc;
      }, {});

    resolve(convertToLocalizeEntities(newKeys));
  });
};

export const logAssets = result => {
  result.map(translation =>
    console.log(chalk.green(translation.id, translation.name, translation.tags))
  );
  console.log(chalk.yellow("Total translations", result.length));
};

module.exports = {
  apiRequest,
  getNewAssets,
  getLocalAssets: convertToLocalizeEntities(getLocalAssets()),
  getAssetsByNamespace: convertToLocalizeEntities(getAssetsByNamespace()),
  logAssets
};
