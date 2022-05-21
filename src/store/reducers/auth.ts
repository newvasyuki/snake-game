import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../actionTypes';

export type AuthState = {
  isLoggedIn: boolean;
  isLoginFailed: boolean;
  bla: boolean; // have to add this because otherwise TS doesn't see the isLoginFailed
};

type UserRegisterAction = {
  type: string;
};

const initialState = { isLoggedIn: false, isLoginFailed: false, bla: false };

const authReducer = (state: AuthState = initialState, action: UserRegisterAction) => {
  const { type } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        isLoginFailed: false,
      };
    case LOGIN_FAILED:
      return {
        isLoggedIn: false,
        isLoginFailed: true,
      };
    case REGISTER_SUCCESS:
      return {
        isLoggedIn: true,
      };
    case REGISTER_FAIL:
      return {
        isLoggedIn: false,
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
