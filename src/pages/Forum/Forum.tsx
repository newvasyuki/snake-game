import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Forum.pcss';
import { Header } from './Header/Header';
import { ThreadDate } from './ThreadDate/ThreadDate';
import mockAvatar from '../../../assets/avatar.jpg';
import { UserInfo } from './UserInfo/UserInfo';
import { User } from '../../api/auth/types';

const mockUserData: Pick<User, 'avatar' | 'first_name' | 'second_name'> = {
  avatar: mockAvatar,
  first_name: 'Snoop',
  second_name: 'Dogg',
};

export const Forum = () => {
  return (
    <div className="forum">
      <Header />
      <ThreadDate />
      <UserInfo user={mockUserData} />
      <Routes>
        {/* подумать над реализацией перехода в топ */}
        <Route index element="top" />
        <Route path="top" element="top" />
        <Route path="latest" element="latest" />
      </Routes>
    </div>
  );
};
