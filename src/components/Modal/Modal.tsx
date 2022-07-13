import bemCn from 'bem-cn-lite';
import { Button } from 'components/Button';
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.pcss';

type ModalProps = React.PropsWithChildren<{
  container: Element;
  onClose?: () => void;
  isOpen: boolean;
}>;

const block = bemCn('modal');

export const Modal: React.FC<ModalProps> = ({ children, container, isOpen, onClose }) => {
  const wrappedChildren = (
    <div className={block()}>
      <div className={block('mask')}>
        <div className={block('wrapper')}>
          <Button className={block('button')} onClick={onClose} aria-label="Закрыть" />
          {children}
        </div>
      </div>
    </div>
  );
  return isOpen ? ReactDOM.createPortal(wrappedChildren, container) : null;
};
