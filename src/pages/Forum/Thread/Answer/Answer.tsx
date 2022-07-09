import bemClassNameLite from 'bem-cn-lite';
import { CommentType } from 'pages/Forum/types';
import randomWords from 'random-words';
import React from 'react';
import { Button } from 'components/Button';
import { setThreads } from 'store/actionCreators';
import { createForumComment } from 'api/forum';
import { useTypedDispatch } from 'store';
import { ForumUser } from 'api/user/types';
import { ThreadDate } from '../../ThreadDate';
import { UserInfo } from '../../UserInfo';
import './Answer.pcss';
import AnswerIcon from '../../../../../assets/answer-icon.react.svg';

type Props = {
  user: ForumUser;
  date: number;
  comment: CommentType;
  parentId: number;
  topicId: number;
};

const block = bemClassNameLite('thread-answer');

export const Answer: React.FC<Props> = ({ user, date, comment, topicId, parentId }) => {
  const dispatch = useTypedDispatch();

  const onAddComment = async () => {
    try {
      await createForumComment(
        {
          topicId,
          parentId: comment.id,
          content: randomWords(5).join(' '),
        },
        user.id,
      );
      dispatch(setThreads());
    } catch (e) {
      console.error(e);
    }
  };

  const nestedComments = (comment.children || []).map((nestedComment) => {
    return (
      <Answer
        key={nestedComment.id}
        user={nestedComment.user}
        date={nestedComment.date}
        comment={nestedComment}
        parentId={comment.id}
        topicId={topicId}
      />
    );
  });

  return (
    <div className={block()}>
      <div className={block('header')}>
        <UserInfo user={user} className={block('user')} />
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
