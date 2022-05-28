import * as actionTypes from './actionTypes';
import { SignUpData, authApi, userApi, SignInData } from '../api';
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

const loginWtihFailure = () => {
  return {
    type: actionTypes.LOGIN_FAILED,
  };
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
    dispatch({
      type: actionTypes.REGISTER_FAIL,
    });
  }
};

export const registerUserAsync = (userData: SignUpData) => async (dispatch: TypedDispatch) => {
  try {
    const userId = await authApi.signUp(userData);
    if (userId) {
      dispatch(getUserInfoAsync());
    } else {
      throw new Error('Failed registration, reason: UserId was not retrieved successfully');
    }
  } catch (e) {
    console.error(e);
    dispatch(registerWithFailure());
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

export const signInUser = (userData: SignInData) => async (dispatch: TypedDispatch) => {
  try {
    await authApi.signIn(userData);
    dispatch(getUserInfoAsync());
  } catch (e) {
    dispatch(loginWtihFailure());
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
