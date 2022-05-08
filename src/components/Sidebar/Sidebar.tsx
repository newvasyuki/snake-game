import React, { useState } from 'react';
import './Sidebar.pcss';
import { useNavigate } from 'react-router-dom';
import MenuItemGame from '../../../assets/menuItemGame.react.svg';
import MenuItemForum from '../../../assets/menuItemForum.react.svg';
import MenuItemLeaders from '../../../assets/menuItemLeaders.react.svg';
import MenuItemRules from '../../../assets/menuItemRules.react.svg';
import CollapseIcon from './CollapseIcon.react.svg';
import { ROUTES } from '../../constants';

const menuItems = {
  game: {
    icon: <MenuItemGame />,
    route: ROUTES.game,
    label: 'Игра',
  },
  leaders: {
    icon: <MenuItemLeaders />,
    route: ROUTES.leaderboard,
    label: 'Лидеры',
  },
  forum: {
    icon: <MenuItemForum />,
    route: ROUTES.forum,
    label: 'Форум',
  },
  rules: {
    icon: <MenuItemRules />,
    route: ROUTES.rules,
    label: 'Правила',
  },
};

interface ChildProps {
  onChangeSidebar: (v: boolean) => void,
  isExpanded: boolean,
  selectedRoute?: string,
}

const Sidebar = ({ onChangeSidebar, isExpanded, selectedRoute = ROUTES.game }: ChildProps) => {
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState(selectedRoute);

  const handleToggler = () => {
    if (isExpanded) {
      onChangeSidebar(false);
      return;
    }
    onChangeSidebar(true);
  };

  const handleSelectedListItem = (route: string) => {
    setActiveRoute(route);
    navigate(route);
  };

  return (
    <div className={isExpanded ? 'sidebar' : 'sidebar_collapsed'}>
      <ul className="sidebar__menu">
        {Object.entries(menuItems).map((item) => {
          return (
            <li
              key={item[0]}
              role="presentation"
              className={
                `${activeRoute === item[1].route ? 'sidebar__menu-item_selected' : 'sidebar__menu-item'}
             ${isExpanded ? 'sidebar__menu-item' : 'sidebar__menu-item_collapsed'}`
              }
              onClick={() => handleSelectedListItem(item[1].route)}
            >
              <div className="sidebar__menu__item-icon">
                {item[1].icon}
              </div>
              <div className={isExpanded ? '' : 'sidebar__text_collapsed'}>
                {item[1].label}
              </div>
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
