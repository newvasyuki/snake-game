import bemClassNameLite from 'bem-cn-lite';
import React from 'react';
import { User } from '../../../../api/auth/types';
import { ThreadDate } from '../../ThreadDate';
import { UserInfo } from '../../UserInfo';
import './Answer.pcss';

type Props = {
  user: Pick<User, 'avatar' | 'first_name' | 'second_name'>;
  date?: Date;
  message: string;
};

const block = bemClassNameLite('thread-answer');

export const Answer: React.FC<Props> = ({ user, date, message }) => {
  return (
    <div className={block()}>
      <UserInfo user={user} className={block('user')} />
      <ThreadDate date={date} className={block('date')} />
      <p className={block('message')}>{message}</p>
    </div>
  );
};
