import * as actionTypes from './actionTypes';
import { SignUpData, authApi, userApi, SignInData } from '../api';
import { UserFormData } from '../pages/Profile/types';
import { TypedDispatch } from '.';
import { User } from '../api/user/types';

type FormDataChangePassword = {
  oldPassword: string;
  newPassword: string;
};

type SetUserType = {
  user?: User | null;
  loading?: boolean;
};

const setUserInfo = (data: SetUserType) => {
  return {
    type: actionTypes.SET_USER_INFO,
    payload: { ...data },
  };
};

type UpdateUserInfoType = {
  userInfo?: UserFormData | null;
  loading?: boolean;
};

const updateUser = (updateUserInfo: UpdateUserInfoType) => {
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

const changePassWithFailure = () => {
  return {
    type: actionTypes.CHANGE_PASSWORD_FAILED,
  };
};

export const changePassWithSuccess = () => {
  return {
    type: actionTypes.CHANGE_PASSWORD_SUCCESS,
  };
};

export const setUserInfoAsync = () => async (dispatch: TypedDispatch) => {
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
      dispatch(setUserInfoAsync());
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

export const signInUserAsync = (userData: SignInData) => async (dispatch: TypedDispatch) => {
  try {
    await authApi.signIn(userData);
    dispatch(setUserInfoAsync());
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

export const updateAvatarAsync = (formData: FormData) => async (dispatch: TypedDispatch) => {
  try {
    const newUserInfo = await userApi.changeAvatar(formData);
    if (newUserInfo) {
      dispatch(setUserInfo({ user: newUserInfo }));
    } else {
      throw new Error('userInfo was not retrieved successfully');
    }
  } catch (e) {
    console.error(e);
  }
};

export const updatePasswordAsync =
  (formData: FormDataChangePassword) => async (dispatch: TypedDispatch) => {
    try {
      await userApi.changePassword(formData);
      dispatch(changePassWithSuccess());
    } catch (e) {
      console.error(e);
      dispatch(changePassWithFailure());
    }
  };
