import * as actionTypes from './actionTypes';
import { authService, userService } from '../services';
import { SignUpData } from '../api';
import { User } from '../api/user/types';

export const registerUser = (userData: SignUpData) => async (dispatch) => {
  try {
    await authService.signUp(userData);
    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
    })
  } catch (e) {
    dispatch({
      type: actionTypes.REGISTER_FAIL
    })
  }
}

export const setUserInfo = (userInfo: User) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_USER_INFO,
      payload: { user: userInfo }
    })
  } catch (e) {
    console.error(e)
  }
}
