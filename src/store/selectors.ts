import { ReduxState } from './index';

export const selectIsLoggedIn = (state: ReduxState) => state.auth.isLoggedIn;
export const selectUserData = (state: ReduxState) => state.user.user;
