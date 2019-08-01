import { Request } from 'express';

const getTokenFromHeader = (authorization: string): string => {
  let token = '';
  const parts = authorization.split(' ');
  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];
    if (/^Bearer$/i.test(scheme)) {
      token = credentials.replace(/"/g, '');
    } else throw new Error('Cannot find token on request authorization');
  }

  return token;
};

const getTokenFromRequest = (request: Request): string => {
  let token = '';
  if (request.headers && request.headers.authorization) {
    token = getTokenFromHeader(request.headers.authorization);
  } else {
    throw new Error('Cannot find request.headers.authorization');
  }
  return token;
};

export default getTokenFromRequest;
