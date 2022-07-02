import React, { useEffect, useState } from 'react';
import bemCn from 'bem-cn-lite';
import { AnswersCount } from '../AnswersCount';
import { ThreadDate } from '../ThreadDate';
import { ThreadLikes } from '../ThreadLikes';
import { UserInfo } from '../UserInfo';
import { ThreadContent } from './ThreadContent';
import { Answer } from './Answer';
import './Thread.pcss';
import { ThreadType } from '../types';
import AnswerIcon from '../../../../assets/answer-icon.react.svg';

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
      <div className={block('reply')}>
        <div className={block('icon-wrapper')}>
          <AnswerIcon />
        </div>
        <span>Ответить</span>
      </div>

      {comments.map((comment) => (
        <Answer userId={comment.userId} date={comment.date} comment={comment} />
      ))}
    </div>
  );
};
