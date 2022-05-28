import * as actionTypes from './actionTypes';
import { SignUpData, authApi, userApi } from '../api';
import { UserFormData } from '../pages/Profile/types';
import { TypedDispatch } from '.';
import { User } from '../api/user/types';

const setUserInfo = (user: User) => {
  return {
    type: actionTypes.SET_USER_INFO,
    payload: { user },
  };
};

const updateUser = (userInfo: UserFormData | null) => {
  return {
    type: actionTypes.UPDATE_USER,
    payload: { user: userInfo },
  };
};

const registerSuccessfully = () => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
  };
};

const registerWithFailure = () => {
  return {
    type: actionTypes.REGISTER_FAIL,
  };
};

const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const registerUserAsync = (userData: SignUpData) => async (dispatch: TypedDispatch) => {
  try {
    const userId = await authApi.signUp(userData);
    if (userId) {
      dispatch(registerSuccessfully());
    } else {
      throw new Error('Failed registration, reason: UserId was not retrieved successfully');
    }
  } catch (e) {
    console.error(e);
    dispatch(registerWithFailure());
  }
};

export const getUserInfoAsync = () => async (dispatch: TypedDispatch) => {
  try {
    const userInfo = await userApi.getUserInfo();
    if (userInfo) {
      dispatch(setUserInfo(userInfo));
    } else {
      throw new Error('User information was not retrieved successfully');
    }
  } catch (e) {
    console.error(e);
  }
};

export const updateUserAsync = (userData: UserFormData) => async (dispatch: TypedDispatch) => {
  try {
    const updatedUserInfo = await userApi.changeProfile(userData);
    if (updatedUserInfo) {
      dispatch(updateUser(updatedUserInfo));
    } else {
      throw new Error('New user information after update was not retrieved successfully');
    }
  } catch (e) {
    console.error(e);
  }
};

export const logoutAsync = () => async (dispatch: TypedDispatch) => {
  try {
    await authApi.logout();
    dispatch(updateUser(null));
    dispatch(logout());
  } catch (e) {
    console.error(e);
  }
};
