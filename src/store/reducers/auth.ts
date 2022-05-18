import { REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL } from "../actionTypes";

export type AuthState = {
  isLoggedIn: boolean;
};

type userRegisterAction = {
  type: string;
};

const initialState = { isLoggedIn: false };

const authReducer = (state: AuthState = initialState, action: userRegisterAction) => {
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
