import bemClassNameLite from 'bem-cn-lite';
import React from 'react';
import './AnswersList.pcss';

const block = bemClassNameLite('answers-list');

export const AnswersList: React.FC = ({ children }) => {
  return <ul className={block()}>{children}</ul>;
};
