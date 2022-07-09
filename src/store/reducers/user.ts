import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
  SET_USER_INFO,
  UPDATE_USER,
  SET_USER_INFO_BY_ID,
} from '../actionTypes';
import { YandexUser } from '../../api/user/types';

type UserInfoAction = {
  type: string;
  payload: { user: YandexUser; loading: boolean };
};

export type UserState = {
  user: YandexUser | null;
  isUserLoading: boolean | null;
  isPasswordChangeFailed: boolean;
};

const initialState = { user: null, isUserLoading: null, isPasswordChangeFailed: null };

const userReducer = (state: UserState = initialState, action: UserInfoAction) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_INFO:
      return {
        ...state,
        user: payload.user,
        isUserLoading: payload.loading ?? false,
      };
    case SET_USER_INFO_BY_ID:
      return {
        ...state,
        user: payload.user,
        isUserLoading: payload.loading ?? false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload.user,
        isUserLoading: payload.loading ?? false,
      };
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        isPasswordChangeFailed: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isPasswordChangeFailed: false,
      };
    default:
      return state;
  }
};

export default userReducer;
