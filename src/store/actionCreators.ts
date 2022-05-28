import * as actionTypes from './actionTypes';
import { SignUpData, authApi, userApi, SignInData } from '../api';
import { UserFormData } from '../pages/Profile/types';
import { TypedDispatch } from '.';

export const getUserInfo = () => async (dispatch: TypedDispatch) => {
  try {
    const userInfo = await userApi.getUserInfo();
    if (userInfo) {
      dispatch({
        type: actionTypes.SET_USER_INFO,
        payload: { user: userInfo },
      });
    } else {
      throw new Error('userInfo was not retrieved successfully');
    }
  } catch (e) {
    console.error(e);
  }
};

export const registerUser = (userData: SignUpData) => async (dispatch: TypedDispatch) => {
  try {
    const userId = await authApi.signUp(userData);
    if (userId) {
      dispatch(getUserInfo());
    } else {
      throw new Error('userId was not retrieved successfully');
    }
  } catch (e) {
    console.error(e);
    dispatch({
      type: actionTypes.REGISTER_FAIL,
    });
  }
};

export const updateUserInfo = (userData: UserFormData) => async (dispatch: TypedDispatch) => {
  try {
    const userInfo = await userApi.changeProfile(userData);
    if (userInfo) {
      dispatch({
        type: actionTypes.UPDATE_USER,
        payload: { user: userInfo },
      });
    } else {
      throw new Error('userInfo was not retrieved successfully');
    }
  } catch (e) {
    console.error(e);
  }
};

export const signInUser = (userData: SignInData) => async (dispatch: TypedDispatch) => {
  try {
    await authApi.signIn(userData);
    dispatch(getUserInfo());
  } catch (e) {
    dispatch({
      type: actionTypes.LOGIN_FAILED,
    });
  }
};

export const logout = () => async (dispatch: TypedDispatch) => {
  try {
    await authApi.logout();
    dispatch({
      type: actionTypes.UPDATE_USER,
      payload: { user: null },
    });
    dispatch({
      type: actionTypes.LOGOUT,
    });
  } catch (e) {
    console.error(e);
  }
};
