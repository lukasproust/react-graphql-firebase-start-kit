import chalk from 'chalk'; // eslint-disable-line import/no-extraneous-dependencies

import { apiRequest } from '../helpers';
import { Asset, LocoAsset } from '../types';

const exportAsset = ({ id, name, tag }: Asset): Promise<LocoAsset> =>
  apiRequest('assets', {
    method: 'POST',
    form: { id, name },
  })
    .then(res => {
      console.log(chalk.green('Successfully added', res.id, 'translation')); // eslint-disable-line no-console
      return apiRequest(`assets/${encodeURIComponent(id)}/tags`, {
        method: 'POST',
        form: { name: tag },
      });
    })
    .then(res => {
      console.log(chalk.green('Successfully added', tag, 'tag')); // eslint-disable-line no-console
      return res;
    });

const exportAllAssets = (assets: Asset[]): (() => Promise<LocoAsset>)[] =>
  assets.map(asset => () => exportAsset(asset));

export default exportAllAssets;
