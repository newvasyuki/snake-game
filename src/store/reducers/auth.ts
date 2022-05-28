import { REGISTER_FAIL, LOGIN_FAILED } from '../actionTypes';

export type AuthState = {
  isRegistrationFailed: boolean;
  isLoginFailed: boolean;
};

type UserRegisterAction = {
  type: string;
};

const initialState = { isRegistrationFailed: false, isLoginFailed: false };

const authReducer = (state: AuthState = initialState, action: UserRegisterAction) => {
  const { type } = action;

  switch (type) {
    case LOGIN_FAILED:
      return {
        isLoginFailed: true,
      };
    case REGISTER_FAIL:
      return {
        isRegistrationFailed: false,
      };
    default:
      return state;
  }
};

export default authReducer;
