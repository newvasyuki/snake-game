import { User } from '../../api/user/types';

export type ForumUser = Pick<User, 'avatar' | 'first_name' | 'second_name'>;
