import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actionTypes'
import { SignUpData } from '../../api';
import { UserInfo } from '../../pages/Forum/UserInfo';

type AuthState = {
  isLoggedIn: boolean,
}

type userRegisterAction = {
  type: string,
}

const initialState = { isLoggedIn: false };

const authReducer = (state: AuthState = initialState, action: userRegisterAction) => {
  const { type } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        isLoggedIn: true
      }
    case REGISTER_FAIL:
      return {
        isLoggedIn: false
      }
    default:
      return state;
  }
}

export default authReducer;