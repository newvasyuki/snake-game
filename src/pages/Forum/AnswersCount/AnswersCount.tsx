import bemCn from 'bem-cn-lite';
import React from 'react';
import AnswerIcon from '../../../../assets/answer-icon.react.svg';
import './AnswersCount.pcss';

type Props = {
  count?: number;
  className?: string;
};

const block = bemCn('answers-count');

export const AnswersCount = ({ count, className }: Props) => {
  return (
    <div className={block(null, className)}>
      <div className={block('icon-wrapper')}>
        <AnswerIcon />
      </div>
      <span className={block('count')}>{count ?? 0} Ответов</span>
    </div>
  );
};
