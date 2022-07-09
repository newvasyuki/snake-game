import bemCn from 'bem-cn-lite';
import React from 'react';
import { Thread } from '../Thread';
import { ThreadList } from '../ThreadList';
import { Threads } from '../types';

type Props = {
  threads?: Threads;
};

const block = bemCn('forum-sub-page');

export const ForumSubPage: React.FC<Props> = ({ threads }) => {
  if (!threads || !threads.length) {
    return <span>No threads</span>;
  }

  return (
    <div className={block()}>
      <ThreadList>
        {threads.map((thread) => (
          <li key={thread.id}>
            <Thread thread={thread} />
          </li>
        ))}
      </ThreadList>
    </div>
  );
};
