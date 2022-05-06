import React from 'react';
import bemCn from 'bem-cn-lite';
import './ThreadDate.pcss';

type Props = {
  date?: Date;
};

const block = bemCn('thread-date');

export const ThreadDate = ({ date = new Date() }: Props) => {
  const dateString = date.toLocaleDateString();

  return (
    <time className={block()} dateTime={dateString}>{dateString}</time>
  );
};
