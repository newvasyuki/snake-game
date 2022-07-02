import React, { useState } from 'react';
import bemCn from 'bem-cn-lite';
import { Modal } from 'components/Modal/Modal';
import { Navigation } from '../Navigation';
import { AddButton } from '../AddButton';
import { CreateTopicForm } from '../CreateTopic/CreateTopic';
import './Header.pcss';

const block = bemCn('forum-header');

export const Header = () => {
  const [isCreatedTopic, setIsCreatedTopic] = useState(false);

  const onButtonClick = () => {
    setIsCreatedTopic((prevState) => !prevState);
  };

  return (
    <div className={block()}>
      <Navigation />
      <AddButton onClick={onButtonClick} />
      <Modal
        isOpen={isCreatedTopic}
        container={document.getElementById('root')}
        onClose={() => setIsCreatedTopic(false)}
      >
        <CreateTopicForm onCancel={() => setIsCreatedTopic(false)} />
      </Modal>
    </div>
  );
};
