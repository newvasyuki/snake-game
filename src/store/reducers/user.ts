import { SET_USER_INFO, UPDATE_USER } from '../actionTypes';
import { User } from '../../api/user/types';

type UserInfoAction = {
  type: string;
  payload: { user: User; loading: boolean };
};

export type UserState = {
  user: User | null;
  isUserLoading: boolean | null;
};

const initialState = { user: null, isUserLoading: null };

const userReducer = (state: UserState = initialState, action: UserInfoAction) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_INFO:
      return {
        ...state,
        user: payload.user,
        isUserLoading: payload.loading ?? false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload.user,
        isUserLoading: payload.loading ?? false,
      };
    default:
      return state;
  }
};

export default userReducer;
