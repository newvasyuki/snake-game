import bemClassNameLite from 'bem-cn-lite';
import { AnswerType } from 'pages/Forum/types';
import React from 'react';
import { Answer } from '../Answer';
import './AnswersList.pcss';

const block = bemClassNameLite('answers-list');

type Props = {
  answers: AnswerType[];
};

export const AnswersList: React.FC<Props> = ({ answers }) => {
  if (!answers) {
    return null;
  }
  return (
    <ul className={block()}>
      {answers.map((answer) => (
        <li key={answer.id}>
          <Answer userId={answer.userId} date={answer.date} message={answer.message} />
        </li>
      ))}
    </ul>
  );
};
