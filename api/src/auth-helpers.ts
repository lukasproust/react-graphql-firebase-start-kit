import admin from 'firebase-admin';

import firebaseAdmin from './firebaseAdmin';

const tradeTokenForUser = async (
  token: string,
): Promise<admin.auth.UserRecord> => {
  return firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then(
      (decodedToken): Promise<admin.auth.UserRecord> => {
        const { uid } = decodedToken;
        return firebaseAdmin
          .auth()
          .getUser(uid)
          .then((userRecord): admin.auth.UserRecord => userRecord)
          .catch((error): never => {
            throw new Error(`Get user with UID failed -> ${error}`);
          });
      },
    )
    .catch((error): never => {
      throw new Error(`Verify ID token -> ${error}`);
    });
};

export default tradeTokenForUser;
