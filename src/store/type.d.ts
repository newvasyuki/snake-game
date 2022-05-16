import { User } from '../api/user/types';

export type UserInfoState = User;

export type UserInfoAction = {
  type: string,
  userInfo: UserInfo
}

type DispatchType = (args: UserInfoAction) => UserInfoAction
