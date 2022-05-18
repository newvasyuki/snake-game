import * as actionTypes from './actionTypes';
import { SignUpData, authApi, userApi } from '../api';
import { UserFormData } from '../pages/Profile/Profile';

export const registerUser = (userData: SignUpData) => async (dispatch) => {
  try {
    const userId = await authApi.signUp(userData);
    if (userId) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
      })
    } else {
      throw new Error('UserId was not retrieved successfully');
    }
  } catch (e) {
    console.error(e);
    dispatch({
      type: actionTypes.REGISTER_FAIL
    })
  }
}

export const getUserInfo = () => async (dispatch) => {
  try {
    const userInfo = await userApi.getUserInfo();
    dispatch({
      type: actionTypes.SET_USER_INFO,
      payload: { user: userInfo }
    })
  } catch (e) {
    console.error(e);
  }
}

export const updateUserInfo = (userData: UserFormData) => async (dispatch) => {
  try {
    const userInfo = await userApi.changeProfile(userData);
    dispatch({
      type: actionTypes.UPDATE_USER,
      payload: { user: userInfo }
    })
  } catch (e) {
    console.error(e);
  }
}

