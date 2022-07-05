import React, { useEffect } from 'react';
import bemCn from 'bem-cn-lite';
import { useTypedDispatch, useTypedSelector } from 'store';
import { ForumSubPage } from './ForumSubPage';
import { Header } from './Header';
import { getTopics } from '../../store/actionCreators';
import './Forum.pcss';

const block = bemCn('forum');

export const Forum = () => {
  const dispatch = useTypedDispatch();
  const threads = useTypedSelector((state) => state.forum.topics);

  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  return (
    <div className={block()}>
      <Header />
      <div className={block('inner-page-container')}>
        <ForumSubPage threads={threads} />
      </div>
    </div>
  );
};
