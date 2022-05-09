import React from 'react';
import { Route, Routes } from 'react-router-dom';
import bemCn from 'bem-cn-lite';
import { ForumSubPage } from './ForumSubPage';
import { Header } from './Header';
import { getMockThreads } from '../../mocks';
import './Forum.pcss';

const Top = <ForumSubPage threads={getMockThreads(1)} />;
const Latest = <ForumSubPage threads={getMockThreads(2)} />;

const block = bemCn('forum');

export const Forum = () => {
  return (
    <div className={block()}>
      <Header />
      <div className={block('inner-page-container')}>
        <Routes>
          {/* подумать над реализацией перехода в топ при переходе в форум */}
          <Route index element={Top} />
          <Route path="top" element={Top} />
          <Route path="latest" element={Latest} />
        </Routes>
      </div>
    </div>
  );
};
