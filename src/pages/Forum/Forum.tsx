import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
          <Route index element={<Navigate to="top" />} />
          <Route path="top" element={Top} />
          <Route path="latest" element={Latest} />
        </Routes>
      </div>
    </div>
  );
};
