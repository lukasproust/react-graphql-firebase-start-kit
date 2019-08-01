import { Context } from './types';

type Next = (root: any, args: any, context: Context, info: any) => any;

export const authenticated = (next: Next): any => (
  root: any,
  args: any,
  context: Context,
  info: any,
): Next => {
  if (!context.currentUser) {
    throw new Error(`Unauthenticated User!`);
  }

  return next(root, args, context, info);
};
