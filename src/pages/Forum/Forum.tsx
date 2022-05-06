import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './Forum.pcss';
import { Header } from './Header/Header';
import { ThreadDate } from './ThreadDate/ThreadDate';
import mockAvatar from '../../../assets/avatar.jpg';
import { UserInfo } from './UserInfo/UserInfo';
import { User } from '../../api/auth/types';
import { ThreadLikes } from './ThreadLikes/ThreadLikes';
import { AnswersCount } from './AnswersCount/AnswersCount';

const mockUserData: Pick<User, 'avatar' | 'first_name' | 'second_name'> = {
  avatar: mockAvatar,
  first_name: 'Snoop',
  second_name: 'Dogg',
};

export const Forum = () => {
  const [likesCount, setLikesCount] = useState(2048);
  return (
    <div className="forum">
      <Header />
      <ThreadDate />
      <UserInfo user={mockUserData} />
      <ThreadLikes
        count={likesCount}
        likeClickHandler={() => setLikesCount((count) => count + 1)}
      />
      <AnswersCount count={15} />
      <Routes>
        {/* подумать над реализацией перехода в топ */}
        <Route index element="top" />
        <Route path="top" element="top" />
        <Route path="latest" element="latest" />
      </Routes>
    </div>
  );
};
