import React, { useEffect, useState } from 'react';
import bemCn from 'bem-cn-lite';
import { setAnsweredThreadIdAction, setAnswerModalStatusAction } from 'store/actionCreators';
import { useTypedDispatch } from 'store';
import { Button } from 'components/Button';
import { AnswersCount } from '../AnswersCount';
import { ThreadDate } from '../ThreadDate';
import { ThreadLikes } from '../ThreadLikes';
import { UserInfo } from '../UserInfo';
import { ThreadContent } from './ThreadContent';
import { Answer } from './Answer';
import { ThreadType } from '../types';
import { getCommentsCount } from './utils';
import AnswerIcon from '../../../../assets/answer-icon.react.svg';

import './Thread.pcss';

const block = bemCn('thread');

type Props = {
  thread: ThreadType;
};

export const Thread: React.FC<Props> = ({ thread }) => {
  const { author, content, comments, date, likes } = thread;
  const [likesCount, setLikesCount] = useState(likes);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (thread.likes) {
      setLikesCount(thread.likes);
    }
  }, [thread]);

  const onAddComment = () => {
    dispatch(setAnsweredThreadIdAction(thread.id));
    dispatch(setAnswerModalStatusAction(true));
  };

  return (
    <div className={block()}>
      <div className={block('topic')}>
        <UserInfo className={block('user')} user={author} />
        <ThreadDate className={block('date')} date={date} />
        <ThreadLikes
          className={block('likes')}
          count={likesCount}
          likeClickHandler={() => setLikesCount((count) => count + 1)}
        />
        <ThreadContent className={block('content')} title={content.title} text={content.message} />
        <AnswersCount className={block('answers')} count={getCommentsCount(comments)} />
      </div>
      <div className={block('reply')}>
        <div className={block('icon-wrapper')}>
          <AnswerIcon />
        </div>
        <Button onClick={onAddComment}>Ответить</Button>
      </div>

      {comments.map((comment) => (
        <Answer
          key={comment.id}
          author={comment.author}
          date={comment.date}
          comment={comment}
          topicId={thread.id}
        />
      ))}
    </div>
  );
};
