import { Threads } from 'pages/Forum/types';
import {
  CLEAR_FORUM_STATE,
  SET_ANSWERED_COMMENT_ID,
  SET_ANSWERED_THREAD_ID,
  SET_ANSWER_MODAL_STATUS,
  SET_THREADS,
  SET_TOPIC_CREATE_MODAL_STATUS,
} from '../actionTypes';

export type ForumState = {
  isAnswerModalOpen: boolean;
  isTopicCreationModalOpen: boolean;
  answeredTopicId: number | null;
  answeredCommentId: number | null;
  threads: Threads;
};

type Action<ActionType, PayloadType = null> = {
  type: ActionType;
  payload: PayloadType;
};

type Payload<K extends keyof ForumState> = Record<K, ForumState[K]>;

type ThreadsUpdateAction = Action<typeof SET_THREADS, Payload<'threads'>>;
type AnswerModalUpdateAction = Action<typeof SET_ANSWER_MODAL_STATUS, Payload<'isAnswerModalOpen'>>;
type TopicCreateModalUpdateAction = Action<
  typeof SET_TOPIC_CREATE_MODAL_STATUS,
  Payload<'isTopicCreationModalOpen'>
>;
type TopicIdSetAction = Action<typeof SET_ANSWERED_THREAD_ID, Payload<'answeredTopicId'>>;
type CommentIdSetAction = Action<typeof SET_ANSWERED_COMMENT_ID, Payload<'answeredCommentId'>>;
type ClearStateAction = Action<typeof CLEAR_FORUM_STATE>;

type ForumAction =
  | ThreadsUpdateAction
  | AnswerModalUpdateAction
  | TopicIdSetAction
  | CommentIdSetAction
  | TopicCreateModalUpdateAction
  | ClearStateAction;

const initialState: ForumState = {
  threads: [],
  answeredCommentId: null,
  answeredTopicId: null,
  isAnswerModalOpen: false,
  isTopicCreationModalOpen: false,
};

const forumReducer = (state: ForumState = initialState, action: ForumAction) => {
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
    case CLEAR_FORUM_STATE:
      return initialState;
    default:
      return state;
  }
};

export default forumReducer;
