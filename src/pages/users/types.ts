import firebaseAdmin from 'firebase-admin';

export interface User
  extends Pick<
    firebaseAdmin.auth.UserRecord,
    'displayName' | 'email' | 'emailVerified'
  > {
  id: string;
}
