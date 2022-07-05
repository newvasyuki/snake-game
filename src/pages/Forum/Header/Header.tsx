import React, { useState } from 'react';
import bemCn from 'bem-cn-lite';
import { TopicData } from 'api/forum/types';
import { useTypedDispatch } from 'store';
import { postTopic } from 'store/actionCreators';
import { Modal } from 'components/Modal/Modal';
import { AddButton } from '../AddButton';
import { CreateTopicForm } from '../CreateTopic/CreateTopic';
import './Header.pcss';

const block = bemCn('forum-header');

export const Header = () => {
  const dispatch = useTypedDispatch();

  const [isCreatedTopic, setIsCreatedTopic] = useState(false);

  const onButtonClick = () => {
    setIsCreatedTopic((prevState) => !prevState);
  };

  const onSubmitTopicCreation = async (data: TopicData) => {
    try {
      await dispatch(postTopic(data));
      setIsCreatedTopic(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={block()}>
      <AddButton onClick={onButtonClick} />
      <Modal
        isOpen={isCreatedTopic}
        container={document.getElementById('root')}
        onClose={() => setIsCreatedTopic(false)}
      >
        <CreateTopicForm
          onCancel={() => setIsCreatedTopic(false)}
          onSubmit={onSubmitTopicCreation}
        />
      </Modal>
    </div>
  );
};
