import React from 'react';
import bemCn from 'bem-cn-lite';
import { NavItem } from './NavItem';
import './Navigation.pcss';

const navigationItems = [
  {
    route: 'top',
    label: 'Топ',
    key: 'top',
  },
  {
    route: 'latest',
    label: 'Последние',
    key: 'latest',
  },
];

const block = bemCn('forum-nav');

export const Navigation = () => {
  return (
    <nav className={block()}>
      <ul className={block('list')}>
        {
          navigationItems.map(
            (item) => (<NavItem to={item.route} key={item.key}>{item.label}</NavItem>),
            )
        }
      </ul>
    </nav>
  );
};
