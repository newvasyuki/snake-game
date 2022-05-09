import React from 'react';
import bemCn from 'bem-cn-lite';
import './ThreadContent.pcss';

type Props = {
  title: string;
  text: string;
  className?: string;
};

const block = bemCn('thread-content');

export const ThreadContent: React.FC<Props> = ({ title, text, className }) => {
  return (
    <div className={block(null, className)}>
      <p className={block('title')}>{title}</p>
      <p className={block('text')}>{text}</p>
    </div>
  );
};
