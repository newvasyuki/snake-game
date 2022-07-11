import React, { useCallback, useMemo, useState } from 'react';
import bemCn from 'bem-cn-lite';
import { TopicData } from 'api/forum/types';
import { createForumTopic } from 'api/forum';
import { useTypedDispatch, useTypedSelector } from 'store';
import { setThreads } from 'store/actionCreators';
import { selectUserData } from 'store/selectors';
import { Modal } from 'components/Modal/Modal';
import { CreateTopicForm } from '../CreateTopic/CreateTopic';
import { AddButton } from '../AddButton';

import './Header.pcss';

const block = bemCn('forum-header');

export const Header = () => {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector(selectUserData);
  const root = useMemo(() => document.getElementById('root'), []);

  const [isCreatedTopic, setIsCreatedTopic] = useState(false);

  const onModalOpen = useCallback(() => {
    setIsCreatedTopic(true);
  }, [setIsCreatedTopic]);

  const onModalClose = useCallback(() => {
    setIsCreatedTopic(false);
  }, [setIsCreatedTopic]);

  const onSubmitTopicCreation = useCallback(
    async (data: TopicData) => {
      try {
        await createForumTopic(data, user.id);
        dispatch(setThreads(user.id));
        setIsCreatedTopic(false);
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, setIsCreatedTopic, user.id],
  );

  return (
    <div className={block()}>
      <AddButton onClick={onModalOpen} />
      <Modal isOpen={isCreatedTopic} container={root} onClose={onModalClose}>
        <CreateTopicForm onCancel={onModalClose} onSubmit={onSubmitTopicCreation} />
      </Modal>
    </div>
  );
};
