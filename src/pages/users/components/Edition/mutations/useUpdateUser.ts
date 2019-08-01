import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

import { User } from 'pages/users/types';
import updateUserQuery from './updateUser.gql';

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  user: { __typename?: 'FirebaseUser' } & User;
};

export interface UpdateUserMutationVariables {
  id: string;
  email?: string;
  displayName?: string;
  emailVerified?: boolean;
}

const useUpdateUserMutation = (
  baseOptions?: MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) => {
  return useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    updateUserQuery,
    baseOptions,
  );
};

export default useUpdateUserMutation;
