import chalk from "chalk"; // eslint-disable-line import/no-extraneous-dependencies
import path from "path"; // eslint-disable-line import/no-extraneous-dependencies
import fs from "fs";

import { apiRequest } from "../helpers";
import { appSrc } from "../../../paths";

interface MessageContainer {
  [key: string]: { message: string };
}

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
        const sortedAssets: MessageContainer = {};
        const sortedAssetKeys = Object.keys(assets).sort();
        sortedAssetKeys.forEach(key => {
          // @ts-ignore
          sortedAssets[key] = assets[key];
        });

        return Object.keys(sortedAssets).reduce(
          (acc: { [key: string]: string }, key) => {
            acc[key] = sortedAssets[key].message;
            return acc;
          },
          {}
        );
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
        // eslint-disable-next-line no-console
        console.log(
          chalk.green(
            `Successfully imported assets for ${locale}`,
            fileTranslationPath
          )
        );
      })
  );

export default importAssets;
