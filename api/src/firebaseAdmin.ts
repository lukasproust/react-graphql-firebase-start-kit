import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://react-graphql-firebase-stater.firebaseio.com',
});

export default admin;
