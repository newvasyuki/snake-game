import React, { useEffect, useState } from 'react';
import bemCn from 'bem-cn-lite';
import { AnswersCount } from '../AnswersCount';
import { ThreadDate } from '../ThreadDate';
import { ThreadLikes } from '../ThreadLikes';
import { UserInfo } from '../UserInfo';
import { ThreadContent } from './ThreadContent';
import { Answer } from './Answer';
import { AnswersList } from './AnswersList';
import { User } from '../../../api/auth/types';
import './Thread.pcss';

export type AnswerType = {
  id: string;
  user: Pick<User, 'avatar' | 'first_name' | 'second_name'>;
  date: Date;
  message: string;
};

export type ThreadType = {
  id: string;
  user: Pick<User, 'avatar' | 'first_name' | 'second_name'>;
  date: Date;
  likes: number;
  content: {
    message: string;
    title: string;
  };
  answers: AnswerType[];
};

const block = bemCn('thread');

type Props = {
  thread: ThreadType;
};

export const Thread: React.FC<Props> = ({ thread }) => {
  const { user, content, answers, date, likes } = thread;
  const [likesCount, setLikesCount] = useState(likes);

  useEffect(() => {
    if (thread.likes) {
      setLikesCount(thread.likes);
    }
  }, [thread]);

  return (
    <div className={block()}>
      <div className={block('topic')}>
        <UserInfo className={block('user')} user={user} />
        <ThreadDate className={block('date')} date={date} />
        <ThreadLikes
          className={block('likes')}
          count={likesCount}
          likeClickHandler={() => setLikesCount((count) => count + 1)}
        />
        <ThreadContent className={block('content')} title={content.title} text={content.message} />
        <AnswersCount className={block('answers')} count={answers.length} />
      </div>
      <AnswersList>
        {answers.map((answer) => (
          <li key={answer.id}>
            <Answer user={answer.user} date={answer.date} message={answer.message} />
          </li>
        ))}
      </AnswersList>
    </div>
  );
};
