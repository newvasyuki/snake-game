import mockAvatar from '../../assets/avatar.jpg';
import { YandexUser } from '../api/user/types';

export const mockUserData: Pick<YandexUser, 'avatar' | 'first_name' | 'second_name'> = {
  avatar: mockAvatar,
  first_name: 'Snoop',
  second_name: 'Dogg',
};
