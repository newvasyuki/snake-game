import { REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT } from '../actionTypes';

export type AuthState = {
  isLoggedIn: boolean;
};

type UserRegisterAction = {
  type: string;
};

const initialState = { isLoggedIn: false };

const authReducer = (state: AuthState = initialState, action: UserRegisterAction) => {
  const { type } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
      };
    case LOGIN_FAIL:
      return {
        isLoggedIn: true,
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
