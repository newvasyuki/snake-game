import React from 'react';
import bemCn from 'bem-cn-lite';
import './ThreadDate.pcss';

type Props = {
  date: number;
  className?: string;
};

const block = bemCn('thread-date');

export const ThreadDate = ({ date, className }: Props) => {
  const dateString = new Date(date).toLocaleDateString();

  return (
    <time className={block(null, className)} dateTime={dateString}>
      {dateString}
    </time>
  );
};
