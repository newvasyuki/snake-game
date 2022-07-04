import { SET_TOPICS } from '../actionTypes';

export type Topic = {
  title: string;
  content: string;
  likes: number;
  date: string;
  userId: number;
};

export type ForumState = {
  topics: Topic[];
};

type TopicsUpdateAction = {
  type: string;
  payload: { topics: Topic[] };
};

const initialState = { topics: [] };

const forumReducer = (state: ForumState = initialState, action: TopicsUpdateAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TOPICS:
      return {
        ...state,
        leaders: payload.topics,
      };
    default:
      return state;
  }
};

export default forumReducer;
