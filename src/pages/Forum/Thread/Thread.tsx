import React, { useEffect, useState } from 'react';
import bemCn from 'bem-cn-lite';
import { AnswersCount } from '../AnswersCount';
import { ThreadDate } from '../ThreadDate';
import { ThreadLikes } from '../ThreadLikes';
import { UserInfo } from '../UserInfo';
import { ThreadContent } from './ThreadContent';
import { AnswersList } from './AnswersList';
import './Thread.pcss';
import { Topic } from '../../../store/reducers/forum';

const block = bemCn('thread');

type Props = {
  thread: Topic;
};

export const Thread: React.FC<Props> = ({ thread }) => {
  const { content, title, likes, userId, date, answers } = thread;

  const [likesCount, setLikesCount] = useState(likes);

  useEffect(() => {
    if (thread.likes) {
      setLikesCount(thread.likes);
    }
  }, [thread]);

  return (
    <div className={block()}>
      <div className={block('topic')}>
        <UserInfo className={block('user')} userId={userId} />
        <ThreadDate className={block('date')} date={date} />
        <ThreadLikes
          className={block('likes')}
          count={likesCount}
          likeClickHandler={() => setLikesCount((count) => count + 1)}
        />
        <ThreadContent className={block('content')} title={title} text={content} />
        <AnswersCount className={block('answers')} count={answers?.length} />
      </div>
      <AnswersList answers={answers} />
    </div>
  );
};
