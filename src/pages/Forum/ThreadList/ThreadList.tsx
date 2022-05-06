import React from 'react';
import bemCn from 'bem-cn-lite';
import './ThreadList.pcss';

const block = bemCn('thread-list');

export const ThreadList: React.FC = ({ children }) => {
  return (
    <ul className={block()}>
      {children}
    </ul>
  );
};
