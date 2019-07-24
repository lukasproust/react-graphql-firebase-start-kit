import { argv } from 'yargs'; // eslint-disable-line import/no-extraneous-dependencies
import chalk from 'chalk'; // eslint-disable-line import/no-extraneous-dependencies

import getLocoAssets from './api/getAll';
import exportAll from './api/exportAll';
import importAll from './api/importAll';
import { SUPPORTED_LOCALES } from '../../../config/locale';
import {
  getNewAssets,
  getLocalAssets,
  logAssets,
  convertToLocalizeEntities,
} from './helpers';
import { Asset } from './types';

console.log(chalk.bold.bgBlue('Translation action')); // eslint-disable-line no-console

switch (argv.command) {
  case 'export-all':
    exportAll(convertToLocalizeEntities(getLocalAssets())).reduce(
      // @ts-ignore
      (cur, next) => cur.then(next),
      Promise.resolve(),
    );
    break;
  case 'export-new':
    getLocoAssets()
      .then(getNewAssets)
      .then((newAssets: Asset[]) =>
        exportAll(newAssets).reduce(
          // @ts-ignore
          (cur, next) => cur.then(next),
          Promise.resolve(),
        ),
      );
    break;
  case 'get-all':
    getLocoAssets().then(logAssets);
    break;
  case 'import-all':
    importAll(SUPPORTED_LOCALES).reduce(
      (cur, next) => cur.then(next),
      Promise.resolve(),
    );
    break;
  default:
    console.log(chalk.bgMagenta('Please give me some args')); // eslint-disable-line no-console
}
