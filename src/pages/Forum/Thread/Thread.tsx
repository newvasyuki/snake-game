import React, { useState } from 'react';
import bemCn from 'bem-cn-lite';
import { AnswersCount } from '../AnswersCount/AnswersCount';
import { ThreadDate } from '../ThreadDate/ThreadDate';
import { ThreadLikes } from '../ThreadLikes/ThreadLikes';
import { UserInfo } from '../UserInfo/UserInfo';
import { ThreadContent } from './ThreadContent/ThreadContent';
import { mockUserData } from '../../../mocks';
import { Answer } from './Answer/Answer';
import { AnswersList } from './AnswersList/AnswersList';
import './Thread.pcss';

const block = bemCn('thread');

const mockText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, pariatur libero illo,
exercitationem excepturi esse maxime illum, consequatur voluptatem repellendus quod?
Dicta adipisci facere, repellat eveniet vel dignissimos molestiae asperiores.`;

const mockAnswers = [
  {
    user: mockUserData,
    date: new Date(),
    message: mockText,
  },
  {
    user: mockUserData,
    date: new Date(),
    message: mockText,
  },
  {
    user: mockUserData,
    date: new Date(),
    message: mockText,
  },
];

export const Thread = () => {
  const [likesCount, setLikesCount] = useState(2048);
  return (
    <div className={block()}>
      <div className={block('topic')}>
        <UserInfo className={block('user')} user={mockUserData} />
        <ThreadDate className={block('date')} />
        <ThreadLikes
          className={block('likes')}
          count={likesCount}
          likeClickHandler={() => setLikesCount((count) => count + 1)}
        />
        <ThreadContent className={block('content')} title="TITLE" text={mockText} />
        <AnswersCount className={block('answers')} count={15} />
      </div>
      <AnswersList>
        {mockAnswers.map((answer) => (
          <li>
            <Answer user={answer.user} date={answer.date} message={answer.message} />
          </li>
        ))}
      </AnswersList>
    </div>
  );
};
