import { Threads } from 'pages/Forum/types';
import { SET_THREADS } from '../actionTypes';

export type ThreadsState = {
  threads: Threads;
};

type ThreadsUpdateAction = {
  type: string;
  payload: { threads: Threads };
};

const initialState = { threads: [] };

const forumReducer = (state: ThreadsState = initialState, action: ThreadsUpdateAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_THREADS:
      return {
        ...state,
        threads: payload.threads,
      };
    default:
      return state;
  }
};

export default forumReducer;
