import React, { ButtonHTMLAttributes } from 'react';
import bemCn from 'bem-cn-lite';
import PlusIcon from '../../../../assets/plus-icon.react.svg';
import './AddButton.pcss';

const block = bemCn('add-button');

type Props = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export const AddButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button type="button" aria-label="Добавить тему" className={block()} onClick={onClick}>
      <div className={block('icon-wrapper')}>
        <PlusIcon />
      </div>
    </button>
  );
};
