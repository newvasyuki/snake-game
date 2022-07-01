import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import bemCn from 'bem-cn-lite';
import { getForumTopics } from 'api/forum';
import { ForumSubPage } from './ForumSubPage';
import { Header } from './Header';
import { getMockThreads } from '../../mocks';
import './Forum.pcss';
import { Threads } from './types';

// const Top = <ForumSubPage threads={getMockThreads(1)} />;
const Latest = <ForumSubPage threads={getMockThreads(2)} />;

const block = bemCn('forum');

export const Forum = () => {
  const [threads, setThreads] = useState<Threads>([]);

  useEffect(() => {
    async function getThreads() {
      const result = await getForumTopics();
      setThreads(result);
    }

    getThreads();
  }, []);

  return (
    <div className={block()}>
      <Header />
      <div className={block('inner-page-container')}>
        <Routes>
          {/* подумать над реализацией перехода в топ при переходе в форум */}
          <Route index element={<ForumSubPage threads={threads} />} />
          <Route path="top" element={<ForumSubPage threads={getMockThreads(1)} />} />
          <Route path="latest" element={Latest} />
        </Routes>
      </div>
    </div>
  );
};
