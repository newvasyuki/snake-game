import * as actionTypes from './actionTypes';
import { userApi } from '../api/user/UserApi'; 
import { UserInfoState, DispatchType } from './type';

export function updateUserInfo(userInfo: UserInfoState) {
  const action = {
    type: actionTypes.UPDATE_USER,
    userInfo
  }

  return (dispatch: DispatchType) => dispatch(action);
}