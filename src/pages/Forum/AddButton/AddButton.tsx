import React from 'react';
import bemCn from 'bem-cn-lite';
import PlusIcon from '../../../../assets/plus-icon.react.svg';
import './AddButton.pcss';

const block = bemCn('add-button');

export const AddButton = () => {
  return (
    <button type="button" aria-label="Добавить тему" className={block()}>
      <div className={block('icon-wrapper')}>
        <PlusIcon />
      </div>
    </button>
  );
};
