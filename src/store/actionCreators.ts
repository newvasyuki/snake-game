import * as actionTypes from './actionTypes';
import { SignUpData, authApi, userApi, SignInData } from '../api';
import { UserFormData } from '../pages/Profile/types';
import { TypedDispatch } from '.';
import { User } from '../api/user/types';

type SetUser = {
  user?: User | null;
  loading?: boolean;
};

const setUserInfo = (data: SetUser) => {
  return {
    type: actionTypes.SET_USER_INFO,
    payload: { ...data },
  };
};

type UpdateUserInfo = {
  userInfo?: UserFormData | null;
  loading?: boolean;
};

const updateUser = (updateUserInfo: UpdateUserInfo) => {
  const { userInfo, loading } = updateUserInfo;
  return {
    type: actionTypes.UPDATE_USER,
    payload: { user: userInfo, loading },
  };
};

const registerWithFailure = () => {
  return {
    type: actionTypes.REGISTER_FAIL,
    loading: false,
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
    dispatch(setUserInfo({ loading: true }));
    const user = await userApi.getUserInfo();
    if (user) {
      dispatch(setUserInfo({ user, loading: false }));
    } else {
      throw new Error('User information was not retrieved successfully');
    }
  } catch (e) {
    console.error(e);
    dispatch(setUserInfo({ loading: false }));
    dispatch(registerWithFailure());
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
      dispatch(updateUser({ userInfo: updatedUserInfo, loading: false }));
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
    dispatch(updateUser({ userInfo: null, loading: false }));
    dispatch(logout());
  } catch (e) {
    console.error(e);
  }
};
