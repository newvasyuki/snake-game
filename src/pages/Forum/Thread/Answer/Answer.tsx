import bemClassNameLite from 'bem-cn-lite';
import React from 'react';
import { ThreadDate } from '../../ThreadDate';
import { UserInfo } from '../../UserInfo';
import './Answer.pcss';

type Props = {
  userId: number;
  date?: string;
  message: string;
};

const block = bemClassNameLite('thread-answer');

export const Answer: React.FC<Props> = ({ userId, date, message }) => {
  return (
    <div className={block()}>
      <UserInfo userId={userId} className={block('user')} />
      <ThreadDate date={date} className={block('date')} />
      <p className={block('message')}>{message}</p>
    </div>
  );
};
