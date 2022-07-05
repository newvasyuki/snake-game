import React, { useEffect } from 'react';
import bemCn from 'bem-cn-lite';
import { useTypedDispatch, useTypedSelector } from 'store';
// import { fetchForumTopics } from 'api/forum';
import { ForumSubPage, NewForumSubPage } from './ForumSubPage';
import { Header } from './Header';
// import { getMockThreads } from '../../mocks';
import { getTopics } from '../../store/actionCreators';
import './Forum.pcss';

const block = bemCn('forum');

export const Forum = () => {
  const dispatch = useTypedDispatch();
  const threads = useTypedSelector((state) => state.forum.topics);

  console.log(threads);

  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  return (
    <div className={block()}>
      <Header />
      <div className={block('inner-page-container')}>
        {/* <ForumSubPage threads={getMockThreads(1)} /> */}
        <NewForumSubPage threads={threads} />
      </div>
    </div>
  );
};
