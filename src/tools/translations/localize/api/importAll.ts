import chalk from "chalk"; // eslint-disable-line import/no-extraneous-dependencies
import path from "path";
import fs from "fs";

import { apiRequest } from "../helpers";
import { appSrc } from "../../../paths";

const importAssets = (
  locales: string[], // Array of locales. Ex : ['fr-fr', 'es-es']
  ext = "json",
  fallback = "en",
  format = "chrome"
) =>
  locales.map(locale => () =>
    apiRequest(
      `export/locale/${locale}.${ext}?fallback=${fallback}&format=${format}`
    )
      .then(assets => {
        // {[key: string] : { message : string, description: string}}
        const sortedAssets = {};
        const sortedAssetKeys = Object.keys(assets).sort();
        sortedAssetKeys.forEach(key => {
          sortedAssets[key] = assets[key];
        });

        return Object.keys(sortedAssets).reduce((acc, key) => {
          acc[key] = sortedAssets[key].message;
          return acc;
        }, {});
      })
      .then(assets => {
        const fileTranslationPath = path.resolve(
          appSrc,
          "locales",
          `${locale}.json`
        );
        fs.writeFileSync(
          fileTranslationPath,
          `${JSON.stringify(assets, null, 2)}\n`
        );

        console.log(
          // eslint-disable-line no-console
          chalk.green(
            `Successfully imported assets for ${locale}`,
            fileTranslationPath
          )
        );
      })
  );

export default importAssets;
