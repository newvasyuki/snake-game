import React, { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import bemCn from 'bem-cn-lite';
import {
  clearForumState,
  setAnsweredCommentIdAction,
  setAnsweredThreadIdAction,
  setAnswerModalStatusAction,
  setThreads,
  setTopicCreateModalStatusAction,
} from 'store/actionCreators';
import { createForumComment, createForumTopic } from 'api/forum';
import { TopicData } from 'api/forum/types';
import { useTypedDispatch, useTypedSelector } from 'store';
import {
  selectCommentId,
  selectIsAnswerModalOpen,
  selectIsTopicCreateModalOpen,
  selectThreads,
  selectTopicId,
  selectUserId,
} from 'store/selectors';
import { Modal } from 'components/Modal';
import { ForumSubPage } from './ForumSubPage';
import { Header } from './Header';
import { CreateTopicForm } from './CreateTopic';
import { CreateAnswerForm } from './CreateAnswer';
import './Forum.pcss';

const block = bemCn('forum');

export const Forum = () => {
  const dispatch = useTypedDispatch();
  const threads = useTypedSelector(selectThreads);
  const userId = useTypedSelector(selectUserId);
  const topicId = useTypedSelector(selectTopicId);
  const commentId = useTypedSelector(selectCommentId);
  const isTopicCreateModalOpen = useTypedSelector(selectIsTopicCreateModalOpen);
  const isAnsweredTopic = useTypedSelector(selectIsAnswerModalOpen);

  const root = useMemo(() => document.getElementById('root'), []);

  useEffect(() => {
    return () => {
      dispatch(clearForumState());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(setThreads(userId));
  }, [dispatch, userId]);

  const onAnswerModalClose = () => {
    dispatch(setAnsweredThreadIdAction(null));
    dispatch(setAnsweredCommentIdAction(null));
    dispatch(setAnswerModalStatusAction(false));
  };

  const toggleTopicCreateModal = (status: boolean) => {
    dispatch(setTopicCreateModalStatusAction(status));
  };

  const onSubmitTopicCreation = async (data: TopicData) => {
    try {
      await createForumTopic(data, userId);
      dispatch(setThreads(userId));
      toggleTopicCreateModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmitAnswerCreation = async (data: TopicData) => {
    try {
      await createForumComment(
        {
          topicId,
          parentId: commentId,
          content: data.content,
        },
        userId,
      );
      dispatch(setThreads(userId));
      onAnswerModalClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={block()}>
      <Header onAddTopic={() => toggleTopicCreateModal(true)} />
      <div className={block('inner-page-container', { empty: !threads || !threads.length })}>
        <Routes>
          <Route index element={<ForumSubPage threads={threads} />} />
        </Routes>
      </div>
      <Modal
        isOpen={isTopicCreateModalOpen}
        container={root}
        onClose={() => toggleTopicCreateModal(false)}
      >
        <CreateTopicForm
          onCancel={() => toggleTopicCreateModal(false)}
          onSubmit={onSubmitTopicCreation}
        />
      </Modal>
      <Modal isOpen={isAnsweredTopic} container={root} onClose={onAnswerModalClose}>
        <CreateAnswerForm onCancel={onAnswerModalClose} onSubmit={onSubmitAnswerCreation} />
      </Modal>
    </div>
  );
};
