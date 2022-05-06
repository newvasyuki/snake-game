import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Forum.pcss';
import { Header } from './Header/Header';
import { Thread } from './Thread/Thread';

export const Forum = () => {
  return (
    <div className="forum">
      <Header />
      <Thread />
      <Routes>
        {/* подумать над реализацией перехода в топ */}
        <Route index element="top" />
        <Route path="top" element="top" />
        <Route path="latest" element="latest" />
      </Routes>
    </div>
  );
};
