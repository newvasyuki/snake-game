import React, { useEffect, useState } from 'react';
import bemCn from 'bem-cn-lite';
import { AnswersCount } from '../AnswersCount';
import { ThreadDate } from '../ThreadDate';
import { ThreadLikes } from '../ThreadLikes';
import { UserInfo } from '../UserInfo';
import { ThreadContent } from './ThreadContent';
import { Answer } from './Answer';
import { AnswersList } from './AnswersList';
import './Thread.pcss';
import { ForumUser } from '../types';

export type AnswerType = {
  id: string;
  user: ForumUser;
  date: Date;
  message: string;
};

export type ThreadType = {
  id: string;
  user: ForumUser;
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
