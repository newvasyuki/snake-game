import bemClassNameLite from 'bem-cn-lite';
import { CommentType } from 'pages/Forum/types';
import React from 'react';
import { ThreadDate } from '../../ThreadDate';
import { UserInfo } from '../../UserInfo';
import './Answer.pcss';

type Props = {
  userId: number;
  date: number;
  comment: CommentType;
};

const block = bemClassNameLite('thread-answer');

export const Answer: React.FC<Props> = ({ userId, date, comment }) => {
  const nestedComments = (comment.children || []).map((nestedComment) => {
    return <Answer userId={comment.userId} date={comment.date} comment={nestedComment} />;
  });

  return (
    <div className={block()}>
      <div className={block('header')}>
        <UserInfo userId={userId} className={block('user')} />
        <ThreadDate date={date} className={block('date')} />
      </div>
      <p className={block('message')}>{comment.content}</p>
      <p className={block('reply')}>Ответить</p>
      {nestedComments}
    </div>
  );
};
