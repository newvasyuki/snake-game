import { getForumTopics, logoutForum } from 'api/forum';
import { Threads } from 'pages/Forum/types';
import * as actionTypes from './actionTypes';
import { SignUpData, authApi, userApi, SignInData } from '../api';
import { UserFormData } from '../pages/Profile/types';
import { TypedDispatch } from '.';
import { YandexUser } from '../api/user/types';
import { OauthData } from '../api/auth/AuthApi';
import { newLeader, getAllLeaderboard } from '../api/leaderBoard';
import { Leaders } from '../pages/LeaderBoard/types';

type FormDataChangePassword = {
  oldPassword: string;
  newPassword: string;
};

type SetUserType = {
  user?: YandexUser | null;
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

const setLeadersAction = (leaders: Leaders) => {
  return {
    type: actionTypes.SET_LEADERS,
    payload: { leaders },
  };
};

const setThreadsAction = (threads: Threads) => {
  return {
    type: actionTypes.SET_THREADS,
    payload: { threads },
  };
};

export const setAnswerModalStatusAction = (isAnswerModalOpen: boolean) => {
  return {
    type: actionTypes.SET_ANSWER_MODAL_STATUS,
    payload: { isAnswerModalOpen },
  };
};

export const setTopicCreateModalStatusAction = (isTopicCreationModalOpen: boolean) => {
  return {
    type: actionTypes.SET_TOPIC_CREATE_MODAL_STATUS,
    payload: { isTopicCreationModalOpen },
  };
};

export const setAnsweredThreadIdAction = (answeredTopicId: number | null) => {
  return {
    type: actionTypes.SET_ANSWERED_THREAD_ID,
    payload: { answeredTopicId },
  };
};

export const setAnsweredCommentIdAction = (answeredCommentId: number | null) => {
  return {
    type: actionTypes.SET_ANSWERED_COMMENT_ID,
    payload: { answeredCommentId },
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
  }
};

export const setUserInfoByIdAsync = (id: number) => async (dispatch: TypedDispatch) => {
  try {
    const user = await userApi.getUserInfoById(id);
    if (user) {
      dispatch(setUserInfo({ user, loading: false }));
    } else {
      throw new Error('User information was not retrieved successfully');
    }
  } catch (e) {
    console.error(e);
    dispatch(setUserInfo({ loading: false }));
  }
};

export const registerUserAsync = (userData: SignUpData) => async (dispatch: TypedDispatch) => {
  try {
    const userId = await authApi.signUp(userData);
    if (userId) {
      dispatch(setUserInfoAsync());
    } else {
      throw new Error('Failed registration, userId was not retrieved successfully');
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
    await logoutForum(); // we need to do it first as we still need Yandex
    await authApi.logout();
    dispatch(updateUser({ userInfo: null, loading: false }));
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

export const setUserInfoOAuthAsync = (oauthData: OauthData) => async (dispatch: TypedDispatch) => {
  try {
    // in our case access token is simply an OK status
    const accessToken = await authApi.getAccessTokenOAuth(oauthData);
    if (accessToken === 'OK') {
      dispatch(setUserInfoAsync());
    }
  } catch (e) {
    console.error(e);
  }
};

export const addNewLeader = (firstName: string, login: string, snakeScore: number) => async () => {
  try {
    await newLeader({
      data: { firstName, login, snakeScore },
      ratingFieldName: 'snakeScore',
    });
  } catch (e) {
    console.error(e);
  }
};

export const setLeaders =
  (limit = 10) =>
  async (dispatch: TypedDispatch) => {
    const collectedLeaders: Leaders = [];
    const newleaders = await getAllLeaderboard({
      ratingFieldName: 'snakeScore',
      cursor: 0,
      limit,
    });
    if (newleaders && newleaders.length > 0) {
      newleaders.forEach((leader, i) => {
        collectedLeaders.push({
          playerName: leader.data.firstName,
          login: leader.data.login,
          snakeLength: leader.data.snakeScore,
          position: i + 1,
        });
      });
    }
    dispatch(setLeadersAction(collectedLeaders));
  };

export const setThreads = (userId: number) => async (dispatch: TypedDispatch) => {
  const threads: Threads = await getForumTopics(userId);
  dispatch(setThreadsAction(threads));
};
