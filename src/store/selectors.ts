import { ReduxState } from './index';

export const selectIsRegistrationFailed = (state: ReduxState) => state.auth.isRegistrationFailed;
export const selectUserData = (state: ReduxState) => state.user.user;
export const selectIsLoginFailed = (state: ReduxState) => state.auth.isLoginFailed;
export const selectChangePassState = (state: ReduxState) => state.user.isPasswordChangeFailed;
export const selectLeaders = (state: ReduxState) => state.leaders.leaders;
export const selectThreads = (state: ReduxState) => state.forumReducer.threads;
