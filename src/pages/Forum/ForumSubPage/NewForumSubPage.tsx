import bemCn from 'bem-cn-lite';
import React from 'react';
import { Topic } from '../../../store/reducers/forum';
import { NewThread } from '../Thread';
import { ThreadList } from '../ThreadList';

type Props = {
  threads?: Topic[];
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
            <NewThread thread={thread} />
          </li>
        ))}
      </ThreadList>
    </div>
  );
};
