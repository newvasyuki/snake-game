import React, { MouseEvent, ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';
import bemCn from 'bem-cn-lite';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { Navigation } from '../Navigation';
import { AddButton } from '../AddButton';
import './Header.pcss';

const block = bemCn('forum-header');

const topicBlock = bemCn('create-topic');

const CreateTopicForm = ({ onCancel }) => {
  return (
    <div className={topicBlock()}>
      <Input />
      <textarea />
      <Button>Создать</Button>
      <Button onClick={onCancel}>Отмена</Button>
    </div>
  );
};

type ModalProps = React.PropsWithChildren<{
  container: Element;
  onClose?: () => void;
  isOpen: boolean;
}>;

const Modal: React.FC<ModalProps> = ({ children, container, isOpen, onClose }) => {
  const wrappedChildren = (
    <div className="modal-mask">
      <div className="modal-wrapper">{children}</div>
    </div>
  );
  return isOpen ? ReactDOM.createPortal(wrappedChildren, container) : null;
};

// type Props = {
//   isOpened: boolean;
//   onClose?: () => void;
// };

// const CreateTopicModal: React.FC<Props> = ({ isOpened, onClose }) => {
//   return (
//     <Modal isOpen={isOpened} container={document.getElementById('root')} onClose={onClose}>
//       <CreateTopicForm onCancel={onClose} />
//     </Modal>
//   );
// };

export const Header = () => {
  const [isCreatedTopic, setIsCreatedTopic] = useState(false);

  const onButtonClick = () => {
    setIsCreatedTopic((prevState) => !prevState);
  };

  return (
    <div className={block()}>
      <Navigation />
      <AddButton onClick={onButtonClick} />
      {/* <CreateTopicModal isOpened={isCreatedTopic} onClose={() => setIsCreatedTopic(false)} /> */}
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
