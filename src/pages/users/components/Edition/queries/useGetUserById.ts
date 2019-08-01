import { QueryHookOptions, useQuery } from '@apollo/react-hooks';

import { User } from 'pages/users/types';
import getUserByIdQuery from './getUserById.gql';

export type UserByIdQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'FirebaseUser' } & User;
};

export interface UserByIdVariables {
  id: string;
}

const useGetUserById = (
  baseOptions?: QueryHookOptions<UserByIdQuery, UserByIdVariables>,
) => {
  return useQuery<UserByIdQuery, UserByIdVariables>(
    getUserByIdQuery,
    baseOptions,
  );
};

export default useGetUserById;
