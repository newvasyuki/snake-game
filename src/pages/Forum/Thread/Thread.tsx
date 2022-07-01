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
import { ThreadType } from '../types';

const block = bemCn('thread');

type Props = {
  thread: ThreadType;
};

export const Thread: React.FC<Props> = ({ thread }) => {
  const { user, content, comments, date, likes } = thread;
  const [likesCount, setLikesCount] = useState(likes);

  useEffect(() => {
    if (thread.likes) {
      setLikesCount(thread.likes);
    }
  }, [thread]);

  return (
    <div className={block()}>
      <div className={block('topic')}>
        <UserInfo className={block('user')} userId={user} />
        <ThreadDate className={block('date')} date={date} />
        <ThreadLikes
          className={block('likes')}
          count={likesCount}
          likeClickHandler={() => setLikesCount((count) => count + 1)}
        />
        <ThreadContent className={block('content')} title={content.title} text={content.message} />
        <AnswersCount className={block('answers')} count={comments.length} />
      </div>
      <AnswersList>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Answer userId={comment.userId} date={comment.date} message={comment.content} />
          </li>
        ))}
      </AnswersList>
    </div>
  );
};
