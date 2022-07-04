import React from 'react';
import bemCn from 'bem-cn-lite';
import { ForumSubPage } from './ForumSubPage';
import { Header } from './Header';
import { getMockThreads } from '../../mocks';
import './Forum.pcss';

const block = bemCn('forum');

export const Forum = () => {
  return (
    <div className={block()}>
      <Header />
      <div className={block('inner-page-container')}>
        <ForumSubPage threads={getMockThreads(1)} />
      </div>
    </div>
  );
};
