import React from 'react';
import './Sidebar.pcss';
import { NavLink } from 'react-router-dom';
import { ThemesToggle } from 'components/ThemesToggle';
import bemCn from 'bem-cn-lite';
import MenuItemGame from '../../../assets/menuItemGame.react.svg';
import MenuItemForum from '../../../assets/menuItemForum.react.svg';
import MenuItemLeaders from '../../../assets/menuItemLeaders.react.svg';
import MenuItemRules from '../../../assets/menuItemRules.react.svg';
import CollapseIcon from './CollapseIcon.react.svg';
import { ROUTES } from '../../constants';

const menuItems = {
  game: {
    icon: <MenuItemGame />,
    route: ROUTES.game.replace('/', ''),
    label: 'Игра',
    uniqueId: 0,
  },
  leaders: {
    icon: <MenuItemLeaders />,
    route: ROUTES.leaderboard.replace('/', ''),
    label: 'Лидеры',
    uniqueId: 1,
  },
  forum: {
    icon: <MenuItemForum />,
    route: ROUTES.forum.replace('/', ''),
    label: 'Форум',
    uniqueId: 2,
  },
  rules: {
    icon: <MenuItemRules />,
    route: ROUTES.rules.replace('/', ''),
    label: 'Правила',
    uniqueId: 3,
  },
};

interface ChildProps {
  onChangeSidebar: (v: boolean) => void;
  isExpanded: boolean;
}

const Sidebar = ({ onChangeSidebar, isExpanded }: ChildProps) => {
  const handleToggler = () => {
    if (isExpanded) {
      onChangeSidebar(false);
      return;
    }
    onChangeSidebar(true);
  };

  const blockRegPage = bemCn('sidebar');

  return (
    <div
      className={isExpanded ? blockRegPage() : blockRegPage({ collapsed: true })}
      data-testid="sidebar"
    >
      <ul className={blockRegPage('menu')}>
        {Object.entries(menuItems).map((item) => {
          return (
            <li key={item[1].uniqueId}>
              <NavLink
                to={item[1].route}
                className={({ isActive }) => (isActive ? 'active' : 'default')}
              >
                <div className={blockRegPage('item-icon')}>{item[1].icon}</div>
                <div className={isExpanded ? '' : blockRegPage('text_collapsed')}>
                  {item[1].label}
                </div>
              </NavLink>
            </li>
          );
        })}
        <ThemesToggle />
      </ul>
      <div className={blockRegPage('collapse-icon')}>
        <CollapseIcon
          onClick={handleToggler}
          data-testid={blockRegPage('collapse-btn')}
          className={isExpanded ? '' : blockRegPage('collapse-icon', { collapsed: true })}
        />
      </div>
    </div>
  );
};

export default Sidebar;
