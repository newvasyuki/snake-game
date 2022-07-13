import React from 'react';
import { EmptyThreads } from '../EmptyThreads';
import { Thread } from '../Thread';
import { ThreadList } from '../ThreadList';
import { Threads } from '../types';

type Props = {
  threads?: Threads;
};

export const ForumSubPage: React.FC<Props> = ({ threads }) => {
  if (!threads || !threads.length) {
    return <EmptyThreads />;
  }

  return (
    <div>
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
