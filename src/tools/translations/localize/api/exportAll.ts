import chalk from "chalk"; // eslint-disable-line import/no-extraneous-dependencies

import { apiRequest } from "../helpers";

const exportAsset = ({
  id,
  name,
  tag
}: {
  id: string;
  name: string;
  tag: string;
}) =>
  apiRequest("assets", {
    method: "POST",
    form: { id, name }
  })
    .then((res: { res: { id: string } }) => {
      console.log(chalk.green("Successfully added", res.id, "translation")); // eslint-disable-line no-console
      return apiRequest(`assets/${encodeURIComponent(id)}/tags`, {
        method: "POST",
        form: { name: tag }
      });
    })
    .then((res: { res: {} }) => {
      console.log(chalk.green("Successfully added", tag, "tag")); // eslint-disable-line no-console
      return res;
    });

const exportAllAssets = assets => assets.map(asset => () => exportAsset(asset));

export default exportAllAssets;
