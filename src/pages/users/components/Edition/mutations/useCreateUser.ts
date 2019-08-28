import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

import { User } from 'pages/users/types';
import getUsersQuery from 'pages/users/components/List/queries/getUsers.gql';

import createUserQuery from './createUser.gql';

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  updateBook: { __typename?: 'FirebaseUser' } & User;
};

export interface CreateUserMutationVariables {
  email?: string;
  displayName?: string;
  password?: string;
}

// TODO fix refetch queries ( and add it on delete query too )
const useCreateUserMutation = (
  baseOptions?: MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) => {
  return useMutation<CreateUserMutation, CreateUserMutationVariables>(
    createUserQuery,
    { ...baseOptions, refetchQueries: [{ query: getUsersQuery }] },
  );
};

export default useCreateUserMutation;
