import { ReduxState } from './index';

export const selectIsRegistrationFailed = (state: ReduxState) => state.auth.isRegistrationFailed;
export const selectUserData = (state: ReduxState) => state.user.user;
export const selectIsLoginFailed = (state: ReduxState) => state.auth.isLoginFailed;
