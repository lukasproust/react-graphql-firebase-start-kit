import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

import { User } from 'pages/users/types';
import getUsersQuery from 'pages/users/components/List/queries/getUsers.gql';
import deleteUserQuery from './deleteUser.gql';

export type DeleteUserMutation = { __typename?: 'Mutation' } & {
  user: { __typename?: 'FirebaseUser' } & User;
};

export interface DeleteUserMutationVariables {
  id: string;
}

const useDeleteUserMutation = (
  baseOptions?: MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >,
) => {
  return useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    deleteUserQuery,
    { ...baseOptions, refetchQueries: [{ query: getUsersQuery }] },
  );
};

export default useDeleteUserMutation;
