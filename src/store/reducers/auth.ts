import { REGISTER_FAIL, LOGIN_FAILED } from '../actionTypes';

export type AuthState = {
  isRegistrationFailed: boolean;
  isLoginFailed: boolean;
  bla: boolean; // have to add this because otherwise TS doesn't see the isLoginFailed
};

type UserRegisterAction = {
  type: string;
};

const initialState = { isRegistrationFailed: false, isLoginFailed: false, bla: false };

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
