import React from 'react';
import bemCn from 'bem-cn-lite';
import './ThreadDate.pcss';

type Props = {
  date?: Date;
  className?: string;
};

const block = bemCn('thread-date');

export const ThreadDate = ({ date = new Date(), className }: Props) => {
  const dateString = date.toLocaleDateString();

  return (
    <time className={block(null, className)} dateTime={dateString}>{dateString}</time>
  );
};
