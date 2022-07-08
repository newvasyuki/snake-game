import bemClassNameLite from 'bem-cn-lite';
import { CommentType } from 'pages/Forum/types';
import randomWords from 'random-words';
import React from 'react';
import { Button } from 'components/Button';
import { setThreads } from 'store/actionCreators';
import { createForumComment } from 'api/forum';
import { useTypedDispatch } from 'store';
import { ThreadDate } from '../../ThreadDate';
import { UserInfo } from '../../UserInfo';
import './Answer.pcss';
import AnswerIcon from '../../../../../assets/answer-icon.react.svg';

type Props = {
  userId: number;
  date: number;
  comment: CommentType;
  parentId: number;
  topicId: number;
};

const block = bemClassNameLite('thread-answer');

export const Answer: React.FC<Props> = ({ userId, date, comment, topicId, parentId }) => {
  const dispatch = useTypedDispatch();

  const onAddComment = async () => {
    try {
      await createForumComment(
        {
          topicId,
          parentId: comment.id,
          content: randomWords(5).join(' '),
        },
        userId,
      );
      dispatch(setThreads());
    } catch (e) {
      console.error(e);
    }
  };

  const nestedComments = (comment.children || []).map((nestedComment) => {
    return (
      <Answer
        key={comment.id}
        userId={comment.userId}
        date={comment.date}
        comment={nestedComment}
        parentId={comment.id}
        topicId={topicId}
      />
    );
  });

  return (
    <div className={block()}>
      <div className={block('header')}>
        <UserInfo userId={userId} className={block('user')} />
        <ThreadDate date={date} className={block('date')} />
      </div>
      <p className={block('message')}>{comment.content}</p>
      <div className={block('reply')}>
        <div className={block('icon-wrapper')}>
          <AnswerIcon />
        </div>
        <Button onClick={onAddComment}>Ответить</Button>
      </div>
      {nestedComments}
    </div>
  );
};
