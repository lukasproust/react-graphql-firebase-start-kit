import { RequestPromise } from 'request-promise-native';

import { apiRequest } from '../helpers';
import { Asset } from '../types';

const getAllTranslations: () => RequestPromise<Asset[]> = () =>
  // @ts-ignore
  apiRequest('assets');

export default getAllTranslations;
