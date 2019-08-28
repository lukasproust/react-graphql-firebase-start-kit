import { User } from 'pages/users/types';

export type Values = Partial<
  Pick<User, 'displayName' | 'email' | 'emailVerified'> & {
    password: string;
  }
>;

export interface MatchParams {
  userId: string | undefined;
}
