/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import bemCn from 'bem-cn-lite';
import './AddButton.pcss';
import { createForumTopic } from 'api/forum';
import randomWords from 'random-words';
import { useTypedDispatch, useTypedSelector } from 'store';
import { selectUserData } from 'store/selectors';
import { setThreads } from 'store/actionCreators';
import PlusIcon from '../../../../assets/plus-icon.react.svg';

const block = bemCn('add-button');

export const AddButton = () => {
  const user = useTypedSelector(selectUserData);
  const dispatch = useTypedDispatch();

  const onAddTopic = async () => {
    try {
      await createForumTopic(
        {
          title: randomWords(2).join(' '),
          content: randomWords(5).join(' '),
        },
        user.id,
      );
      dispatch(setThreads(user.id));
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
