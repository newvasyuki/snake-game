import React, { useCallback, useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import bemCn from 'bem-cn-lite';
import {
  setAnsweredCommentIdAction,
  setAnsweredThreadIdAction,
  setAnswerModalStatusAction,
  setThreads,
  setTopicCreateModalStatusAction,
} from 'store/actionCreators';
import { createForumComment, createForumTopic } from 'api/forum';
import { TopicData } from 'api/forum/types';
import { ReduxState, useTypedDispatch, useTypedSelector } from 'store';
import { selectThreads, selectUserData } from 'store/selectors';
import { Modal } from 'components/Modal/Modal';
import randomWords from 'random-words';
import { ForumSubPage } from './ForumSubPage';
import { Header } from './Header';
import { CreateTopicForm } from './CreateTopic/CreateTopic';
import './Forum.pcss';
import { CreateAnswerForm } from './CreateAnswer/CreateAnswer';

const block = bemCn('forum');

export const Forum = () => {
  const threads = useTypedSelector(selectThreads);
  const dispatch = useTypedDispatch();
  const user = useTypedSelector(selectUserData);

  const isCreatedTopic = useTypedSelector(
    (store: ReduxState) => store.forumReducer.isTopicCreationModalOpen,
  );
  const isAnsweredTopic = useTypedSelector(
    (store: ReduxState) => store.forumReducer.isAnswerModalOpen,
  );
  const topicId = useTypedSelector((store: ReduxState) => store.forumReducer.answeredTopicId);
  const commentId = useTypedSelector((store: ReduxState) => store.forumReducer.answeredCommentId);

  const root = useMemo(() => document.getElementById('root'), []);

  useEffect(() => {
    dispatch(setThreads(user.id));
  }, [dispatch, user]);

  const onAnswerModalClose = () => {
    dispatch(setAnsweredThreadIdAction(null));
    dispatch(setAnsweredCommentIdAction(null));
    dispatch(setAnswerModalStatusAction(false));
  };

  const onModalOpen = useCallback(() => {
    dispatch(setTopicCreateModalStatusAction(true));
  }, [dispatch]);

  const onModalClose = useCallback(() => {
    dispatch(setTopicCreateModalStatusAction(false));
  }, [dispatch]);

  const onSubmitTopicCreation = useCallback(
    async (data: TopicData) => {
      try {
        await createForumTopic(data, user.id);
        dispatch(setThreads(user.id));
        onModalClose();
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, onModalClose, user.id],
  );

  const onSubmitAnswerCreation = async (data: TopicData) => {
    try {
      await createForumComment(
        {
          topicId,
          parentId: commentId,
          content: data.content,
        },
        user.id,
      );
      dispatch(setThreads(user.id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={block()}>
      <Header onAddTopic={onModalOpen} />
      <div className={block('inner-page-container')}>
        <Routes>
          <Route index element={<ForumSubPage threads={threads} />} />
        </Routes>
      </div>
      <Modal isOpen={isCreatedTopic} container={root} onClose={onModalClose}>
        <CreateTopicForm onCancel={onModalClose} onSubmit={onSubmitTopicCreation} />
      </Modal>
      <Modal isOpen={isAnsweredTopic} container={root} onClose={onAnswerModalClose}>
        <CreateAnswerForm onCancel={onAnswerModalClose} onSubmit={onSubmitAnswerCreation} />
      </Modal>
    </div>
  );
};
