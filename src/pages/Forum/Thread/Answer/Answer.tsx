import bemClassNameLite from 'bem-cn-lite';
import { CommentType } from 'pages/Forum/types';
import React from 'react';
import { Button } from 'components/Button';
import { setAnswerModalStatusAction } from 'store/actionCreators';
import { useTypedDispatch } from 'store';
import { ForumUser } from 'api/user/types';
import { ThreadDate } from '../../ThreadDate';
import { UserInfo } from '../../UserInfo';
import './Answer.pcss';
import AnswerIcon from '../../../../../assets/answer-icon.react.svg';

type Props = {
  author: ForumUser;
  date: number;
  comment: CommentType;
  parentId: number;
  topicId: number;
};

const block = bemClassNameLite('thread-answer');

export const Answer: React.FC<Props> = ({ author, date, comment, topicId, parentId }) => {
  const dispatch = useTypedDispatch();

  const onAddComment = () => {
    dispatch(setAnswerModalStatusAction(true));
    // try {
    //   await createForumComment(
    //     {
    //       topicId,
    //       parentId: comment.id,
    //       content: randomWords(5).join(' '),
    //     },
    //     user.id,
    //   );
    //   dispatch(setThreads(user.id));
    // } catch (e) {
    //   console.error(e);
    // }
  };

  const nestedComments = (comment.children || []).map((nestedComment) => {
    return (
      <Answer
        key={nestedComment.id}
        author={nestedComment.author}
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
        <UserInfo user={author} className={block('user')} />
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
