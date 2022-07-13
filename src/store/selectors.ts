import { ReduxState } from './index';

export const selectIsRegistrationFailed = (state: ReduxState) => state.auth.isRegistrationFailed;
export const selectUserData = (state: ReduxState) => state.user.user;
export const selectUserId = (state: ReduxState) => state.user.user?.id;
export const selectIsLoginFailed = (state: ReduxState) => state.auth.isLoginFailed;
export const selectChangePassState = (state: ReduxState) => state.user.isPasswordChangeFailed;
export const selectLeaders = (state: ReduxState) => state.leaders.leaders;
export const darkMode = (state: ReduxState) => state.darkModeReducer;
export const selectThreads = (state: ReduxState) => state.forumReducer.threads;
export const selectTopicId = (store: ReduxState) => store.forumReducer.answeredTopicId;
export const selectCommentId = (store: ReduxState) => store.forumReducer.answeredCommentId;
export const selectIsTopicCreateModalOpen = (store: ReduxState) =>
  store.forumReducer.isTopicCreationModalOpen;
export const selectIsAnswerModalOpen = (store: ReduxState) => store.forumReducer.isAnswerModalOpen;
