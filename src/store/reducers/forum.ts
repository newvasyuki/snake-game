import { Threads } from 'pages/Forum/types';
import {
  SET_ANSWERED_COMMENT_ID,
  SET_ANSWERED_THREAD_ID,
  SET_ANSWER_MODAL_STATUS,
  SET_THREADS,
  SET_TOPIC_CREATE_MODAL_STATUS,
} from '../actionTypes';

export type ThreadsState = {
  isAnswerModalOpen: boolean;
  isTopicCreationModalOpen: boolean;
  answeredTopicId: number | null;
  answeredCommentId: number | null;
  threads: Threads;
};

type ThreadsUpdateAction = {
  type: typeof SET_THREADS;
  payload: { threads: Threads };
};

type AnswerModalUpdateAction = {
  type: typeof SET_ANSWER_MODAL_STATUS;
  payload: { isAnswerModalOpen: boolean };
};

type TopicCreateModalUpdateAction = {
  type: typeof SET_TOPIC_CREATE_MODAL_STATUS;
  payload: { isTopicCreationModalOpen: boolean };
};

type TopicIdSetAction = {
  type: typeof SET_ANSWERED_THREAD_ID;
  payload: { answeredTopicId: number | null };
};

type CommentIdSetAction = {
  type: typeof SET_ANSWERED_COMMENT_ID;
  payload: { answeredCommentId: number | null };
};

type ForumAction =
  | ThreadsUpdateAction
  | AnswerModalUpdateAction
  | TopicIdSetAction
  | CommentIdSetAction
  | TopicCreateModalUpdateAction;

const initialState: ThreadsState = {
  threads: [],
  answeredCommentId: null,
  answeredTopicId: null,
  isAnswerModalOpen: false,
  isTopicCreationModalOpen: false,
};

const forumReducer = (state: ThreadsState = initialState, action: ForumAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_THREADS:
      return {
        ...state,
        threads: payload.threads,
      };
    case SET_ANSWER_MODAL_STATUS:
      return {
        ...state,
        isAnswerModalOpen: payload.isAnswerModalOpen,
      };
    case SET_TOPIC_CREATE_MODAL_STATUS:
      return {
        ...state,
        isTopicCreationModalOpen: payload.isTopicCreationModalOpen,
      };
    case SET_ANSWERED_THREAD_ID:
      return {
        ...state,
        answeredTopicId: payload.answeredTopicId,
      };
    case SET_ANSWERED_COMMENT_ID:
      return {
        ...state,
        answeredCommentId: payload.answeredCommentId,
      };
    default:
      return state;
  }
};

export default forumReducer;
