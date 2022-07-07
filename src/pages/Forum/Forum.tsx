import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import bemCn from 'bem-cn-lite';
import { setThreads } from 'store/actionCreators';
import { selectThreads } from 'store/selectors';
import { ForumSubPage } from './ForumSubPage';
import { Header } from './Header';
import './Forum.pcss';
import { useTypedDispatch, useTypedSelector } from '../../store';

const block = bemCn('forum');

export const Forum = () => {
  const threads = useTypedSelector(selectThreads);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(setThreads());
  }, [dispatch]);

  return (
    <div className={block()}>
      <Header />
      <div className={block('inner-page-container')}>
        <Routes>
          <Route index element={<ForumSubPage threads={threads} />} />
          {/* подумать над реализацией перехода в топ при переходе в форум */}
          {/* <Route path="top" element={<ForumSubPage threads={threads} />} /> */}
          {/* <Route path="latest" element={Latest} /> */}
        </Routes>
      </div>
    </div>
  );
};
