import bemCn from 'bem-cn-lite';
import React from 'react';
import AnswerIcon from '../../../../assets/answer-icon.svg';
import './AnswersCount.pcss';

type Props = {
  count?: number;
};

const block = bemCn('answers-count');

export const AnswersCount = ({ count }: Props) => {
  return (
    <div className={block()}>
      <div className={block('icon-wrapper')}>
        <AnswerIcon />
      </div>
      <span className={block('count')}>
        {count ?? 0}
        {' '}
        Ответов
      </span>
    </div>
  );
};
