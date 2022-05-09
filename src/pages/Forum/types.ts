import { User } from '../../api/auth/types';

export type ForumUser = Pick<User, 'avatar' | 'first_name' | 'second_name'>;
