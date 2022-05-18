import {
  SET_USER_INFO, UPDATE_USER,
} from '../actionTypes'
import { User } from '../../api/user/types';

export type UserState = {
  user: User
}

type setUserInfoAction = {
  type: string,
  payload: { user: User }
}

const initialState = { user: null };

const userReducer = (state: UserState = initialState, action: setUserInfoAction) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_INFO:
      return {
        ...state,
        user: payload.user
      }
    case UPDATE_USER:
      return {
        ...state,
        user: payload.user
      }
    default:
      return state;
  }
}

export default userReducer;