import React from 'react';
import bemCn from 'bem-cn-lite';
import { Navigation } from '../Navigation';
import { AddButton } from '../AddButton/AddButton';
import './Header.pcss';

const block = bemCn('forum-header');

export const Header = () => {
  return (
    <div className={block()}>
      <Navigation />
      <AddButton />
    </div>
  );
};
