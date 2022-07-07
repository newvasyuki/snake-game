import { Leaders } from '../../pages/LeaderBoard/types';
import { SET_LEADERS } from '../actionTypes';

export type LeadersState = {
  leaders: Leaders;
};

type LeadersUpdateAction = {
  type: string;
  payload: { leaders: Leaders };
};

const initialState = { leaders: [] };

const leadersReducer = (state: LeadersState = initialState, action: LeadersUpdateAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LEADERS:
      return {
        ...state,
        leaders: payload.leaders,
      };
    default:
      return state;
  }
};

export default leadersReducer;
