import firebaseAdmin from 'firebase-admin';

export interface Context {
  authToken: string | undefined;
  currentUser: firebaseAdmin.auth.UserRecord | undefined;
}
