import {
  SET_USER_INFO, UPDATE_USER,
} from '../actionTypes'
import { User } from '../../api/user/types';


type setUserInfoAction = {
  type: string,
  payload: { user: User | null }
}

const initialState = { user: null };

const userReducer = (state = initialState, action: setUserInfoAction) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_INFO:
      return {
        ...state,
        user: payload.user
      }
    case UPDATE_USER:
      return {
        ...state,
        user: payload.user
      }
    default:
      return state;
  }
}

export default userReducer;