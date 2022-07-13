import { User as UserModel } from '../../../../db/models/user';
import { User } from './types';

export function upsertUser(user: User) {
  return UserModel.upsert({
    id: user.id,
    firstName: user.first_name,
    secondName: user.second_name,
    displayName: user.display_name,
    login: user.login,
    avatar: user.avatar,
    email: user.email,
    phone: user.phone,
  });
}

export async function findUserById(userId: number) {
  return UserModel.findOne({ where: { id: userId } });
}
