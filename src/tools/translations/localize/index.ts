import { argv } from "yargs"; // eslint-disable-line import/no-extraneous-dependencies
import chalk from "chalk"; // eslint-disable-line import/no-extraneous-dependencies

import getLocoAssets from "./api/getAll";
import exportAllAssets from "./api/exportAll";
import importAllAssets from "./api/importAll";
import { getNewAssets, getLocalAssets, logAssets } from "./helpers";
import { SUPPORTED_LOCALES } from "../../../config/locale";

console.log(chalk.bold.bgBlue("Translation action")); // eslint-disable-line no-console

switch (argv.command) {
  case "export-all":
    exportAllAssets(getLocalAssets).reduce(
      (cur, next) => cur.then(next),
      Promise.resolve()
    );
    break;
  case "export-new":
    getLocoAssets()
      .then(getNewAssets)
      .then(res =>
        exportAllAssets(res).reduce(
          (cur, next) => cur.then(next),
          Promise.resolve()
        )
      );
    break;
  case "get-all":
    getLocoAssets().then(logAssets);
    break;
  case "import-all":
    importAllAssets(SUPPORTED_LOCALES).reduce(
      (cur, next) => cur.then(next),
      Promise.resolve()
    );
    break;
  default:
    console.log(chalk.bgMagenta("Please give me some args")); // eslint-disable-line no-console
}
