import { GraphQLServer } from 'graphql-yoga';
import firebaseAdmin from 'firebase-admin';
import { IResolvers } from 'graphql-tools';

import getTokenFromRequest from 'utils/getTokenFromRequest';

import tradeTokenForUser from './auth-helpers';
import { Context } from './types';
import { authenticated } from './authenticated-guard';

const resolvers: IResolvers = {
  Query: {
    info: (): string => `This is the API to testing front-env`,
    serverTime: (): Date => new Date(),
    me: authenticated(
      (_root, _args, context): firebaseAdmin.auth.UserRecord | undefined =>
        context.currentUser,
    ),
    users: (): Promise<firebaseAdmin.auth.UserRecord[]> => {
      return firebaseAdmin
        .auth()
        .listUsers(1000)
        .then(
          (
            listUsersResult: firebaseAdmin.auth.ListUsersResult,
          ): firebaseAdmin.auth.UserRecord[] => listUsersResult.users,
        )
        .catch((error): never => {
          throw new Error(`Error listing users: ${error}`); // eslint-disable-line no-console
        });
    },
    user: (
      _root: unknown,
      { uid }: firebaseAdmin.auth.CreateRequest,
    ): Promise<firebaseAdmin.auth.UserRecord> => {
      if (!uid) throw new Error('You need to provide an user uid');
      return firebaseAdmin
        .auth()
        .getUser(uid)
        .then(
          (
            userResult: firebaseAdmin.auth.UserRecord,
          ): firebaseAdmin.auth.UserRecord => userResult,
        )
        .catch((error): never => {
          throw new Error(`Error getting user by uid: ${error}`); // eslint-disable-line no-console
        });
    },
  },
  Mutation: {
    post: (
      _root: unknown,
      {
        email,
        password,
        phoneNumber,
        photoURL,
        displayName,
      }: firebaseAdmin.auth.CreateRequest,
    ): Promise<firebaseAdmin.auth.UserRecord> => {
      const newUser = {
        email,
        emailVerified: false,
        phoneNumber,
        password,
        displayName,
        photoURL,
        disabled: false,
      };
      return firebaseAdmin
        .auth()
        .createUser(newUser)
        .then(
          (
            userRecord: firebaseAdmin.auth.UserRecord,
          ): firebaseAdmin.auth.UserRecord => userRecord,
        )
        .catch((error): never => {
          throw new Error(`Error creating new user: ${error}`); // eslint-disable-line no-console
        });
    },
    update: (
      _root: unknown,
      {
        uid,
        email,
        phoneNumber,
        emailVerified,
        password,
        displayName,
        photoURL,
        disabled,
      }: { uid: string } & firebaseAdmin.auth.UpdateRequest,
    ): Promise<firebaseAdmin.auth.UserRecord> => {
      return firebaseAdmin
        .auth()
        .updateUser(uid, {
          email,
          phoneNumber,
          emailVerified,
          password,
          displayName,
          photoURL,
          disabled,
        })
        .then(
          (
            userRecord: firebaseAdmin.auth.UserRecord,
          ): firebaseAdmin.auth.UserRecord => userRecord,
        )
        .catch((error): never => {
          throw new Error(`Error updating user: ${error}`);
        });
    },
    delete: (
      _root: unknown,
      { uid }: { uid: string },
    ): Promise<{ uid: string }> => {
      return firebaseAdmin
        .auth()
        .deleteUser(uid)
        .then((): { uid: string } => ({ uid }))
        .catch((error): never => {
          throw new Error(`Error deleting user: ${error}`);
        });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: async ({ request }): Promise<Context> => {
    let authToken;
    let currentUser: firebaseAdmin.auth.UserRecord | undefined;

    try {
      authToken = getTokenFromRequest(request);
      if (authToken) currentUser = await tradeTokenForUser(authToken);
    } catch (e) {
      console.warn(e); // eslint-disable-line no-console
    }

    return {
      authToken,
      currentUser,
    };
  },
});

server.start(
  (): void => console.log(`🚀 Server is running on http://localhost:4000`), // eslint-disable-line no-console
);
