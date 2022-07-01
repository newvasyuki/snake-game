/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import bemCn from 'bem-cn-lite';
import './AddButton.pcss';
import { createForumTopic } from 'api/forum';
import randomWords from 'random-words';
import PlusIcon from '../../../../assets/plus-icon.react.svg';

const block = bemCn('add-button');

export const AddButton = () => {
  const onAddTopic = async () => {
    try {
      await createForumTopic({
        title: randomWords(2).join(' '),
        content: randomWords(5).join(' '),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button type="button" aria-label="Добавить тему" className={block()}>
      <div className={block('icon-wrapper')}>
        <PlusIcon onClick={onAddTopic} />
      </div>
    </button>
  );
};
