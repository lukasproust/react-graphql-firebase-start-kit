import { QueryHookOptions, useQuery } from '@apollo/react-hooks';

import { User } from 'pages/users/types';
import getUsersQuery from './getUsers.gql';

export type UsersQuery = { __typename?: 'Query' } & {
  users: { __typename?: 'FirebaseUser' } & User[];
};

const useUsersQuery = (baseOptions?: QueryHookOptions<{}>) => {
  return useQuery<UsersQuery, {}>(getUsersQuery, baseOptions);
};

export default useUsersQuery;
