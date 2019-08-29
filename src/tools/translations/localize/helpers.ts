import chalk from 'chalk'; // eslint-disable-line import/no-extraneous-dependencies
import path from 'path'; // eslint-disable-line import/no-extraneous-dependencies
import request, { RequestPromise } from 'request-promise-native';
import fs from 'fs';

import { PRIVATE_KEYS } from '../../../config/keys';
import { Asset, LocoAsset } from './types';

const getTagFromTranslationKey = (key: string): string => {
  const splittedKey = key.split('.');
  const tag = splittedKey[0] || '';
  return tag;
};

export const convertToLocalizeEntities = (
  translations: Record<string, string>,
): Asset[] =>
  Object.keys(translations).map(translationKey => ({
    id: translationKey,
    name: translations[translationKey],
    tag: getTagFromTranslationKey(translationKey),
    locale: 'en-US',
  }));

export const getLocalAssets: () => Record<string, string> = () => {
  const filePath = path.join(__dirname, '../../../locales/en_US.json');

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    // translation file does not exists yet, do nothing
    return {};
  }
};

export const apiRequest = (
  endpoint: string,
  options: object | undefined = undefined,
): RequestPromise<LocoAsset> => {
  const uri = `https://localise.biz/api/${endpoint}`;
  const reqOptions = {
    uri,
    headers: {
      Authorization: `Loco ${PRIVATE_KEYS.loco}`,
    },
    json: true,
    ...options,
  };

  return request(reqOptions);
};

export const getNewAssets = (locoTrans: LocoAsset[]): Promise<Asset[]> => {
  return new Promise(resolve => {
    const translations = getLocalAssets();
    const newKeys = Object.keys(translations)
      .filter(localKey => {
        const keyExists: boolean = locoTrans.reduce(
          (acc: boolean, translation: { id: string }) =>
            translation.id === localKey || acc === true,
          false,
        );
        return !keyExists;
      })
      .reduce((acc: { [key: string]: string }, key: string) => {
        acc[key] = translations[key];
        return acc;
      }, {});
    resolve(convertToLocalizeEntities(newKeys));
  });
};

export const logAssets = (result: Asset[]) => {
  result.map((translation: Asset) =>
    // eslint-disable-next-line no-console
    console.log(chalk.green(translation.id, translation.name, translation.tag)),
  );
  // eslint-disable-next-line no-console
  console.log(chalk.yellow('Total translations', result.length.toString()));
};
