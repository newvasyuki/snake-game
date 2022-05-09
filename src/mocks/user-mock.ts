import mockAvatar from '../../assets/avatar.jpg';
import { User } from '../api/auth/types';

export const mockUserData: Pick<User, 'avatar' | 'first_name' | 'second_name'> = {
  avatar: mockAvatar,
  first_name: 'Snoop',
  second_name: 'Dogg',
};
