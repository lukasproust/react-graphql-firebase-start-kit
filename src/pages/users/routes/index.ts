import { SEGMENTS, PARAMS } from './segments';

const HOME = `/${SEGMENTS.HOME}`;
const USER_LIST = `${HOME}/${SEGMENTS.LIST}`;
const USER_EDIT = `${HOME}/${SEGMENTS.EDIT}/:${PARAMS.USER_ID}?`;

export const ROUTES = {
  HOME,
  USER_LIST,
  USER_EDIT,
} as const;
