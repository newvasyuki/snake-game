import React, { useEffect, useState } from 'react';
import bemCn from 'bem-cn-lite';
import { createForumComment } from 'api/forum';
import randomWords from 'random-words';
import { setThreads } from 'store/actionCreators';
import { useTypedDispatch } from 'store';
import { Button } from 'components/Button';
import { AnswersCount } from '../AnswersCount';
import { ThreadDate } from '../ThreadDate';
import { ThreadLikes } from '../ThreadLikes';
import { UserInfo } from '../UserInfo';
import { ThreadContent } from './ThreadContent';
import { Answer } from './Answer';
import './Thread.pcss';
import { CommentType, ThreadType } from '../types';
import AnswerIcon from '../../../../assets/answer-icon.react.svg';

const block = bemCn('thread');

type Props = {
  thread: ThreadType;
};

export const Thread: React.FC<Props> = ({ thread }) => {
  const { user, content, comments, date, likes } = thread;
  const [likesCount, setLikesCount] = useState(likes);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (thread.likes) {
      setLikesCount(thread.likes);
    }
  }, [thread]);

  const onAddComment = async () => {
    try {
      await createForumComment(
        {
          topicId: thread.id,
          parentId: null,
          content: randomWords(5).join(' '),
        },
        user.id,
      );
      dispatch(setThreads());
    } catch (e) {
      console.error(e);
    }
  };

  const commentsCount = (treeLikeComments: CommentType[], count = 0) => {
    // eslint-disable-next-line no-param-reassign
    count = treeLikeComments.length;
    if (count === 0) return 0;
    // eslint-disable-next-line no-return-assign, no-param-reassign
    treeLikeComments.forEach((comment) => (count += commentsCount(comment.children, count)));
    return count;
  };

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
        <AnswersCount className={block('answers')} count={commentsCount(comments)} />
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
          user={comment.user}
          date={comment.date}
          comment={comment}
          parentId={comment.id}
          topicId={thread.id}
        />
      ))}
    </div>
  );
};
