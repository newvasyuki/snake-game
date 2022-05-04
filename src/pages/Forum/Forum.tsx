import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './Navigation';
import './Forum.pcss';

export const Forum = () => {
  return (
    <div className="forum">
      <Navigation />
      <Routes>
        {/* подумать над реализацией перехода в топ */}
        <Route index element="top" />
        <Route path="top" element="top" />
        <Route path="latest" element="latest" />
      </Routes>
    </div>
  );
};
