import React from 'react';
import './Sidebar.pcss';
import { NavLink } from 'react-router-dom';
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

  const activeStyle = {
    Position: 'relative',
    height: '3rem',
    backgroundColor: 'var(--bittersweet)',
    borderRadius: '0 0.6rem 0.6rem 0',
    color: 'white',
    display: 'flex',
    FlexDirection: 'row',
    alignItems: 'center',
    TextDecoration: 'underline',
    cursor: 'pointer',
  };

  const defaultStyle = {
    Position: 'relative',
    width: '17rem',
    height: '3rem',
    display: 'flex',
    FlexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
  };

  return (
    <div className={isExpanded ? 'sidebar' : 'sidebar_collapsed'}>
      <ul className="sidebar__menu">
        {Object.entries(menuItems).map((item) => {
          return (
            <li key={item[1].uniqueId}>
              <NavLink
                to={item[1].route}
                style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
              >
                <div className="sidebar__menu__item-icon">{item[1].icon}</div>
                <div className={isExpanded ? '' : 'sidebar__text_collapsed'}>{item[1].label}</div>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="sidebar__collapse-icon">
        <CollapseIcon
          onClick={handleToggler}
          className={isExpanded ? '' : 'sidebar__collapse-icon_collapsed'}
        />
      </div>
    </div>
  );
};

export default Sidebar;
