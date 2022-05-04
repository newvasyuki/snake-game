import React, { useState } from 'react';
import './Sidebar.pcss';
import { useNavigate } from 'react-router-dom';
import MenuItemGame from '../../../assets/menuItemGame.svg';
import MenuItemForum from '../../../assets/menuItemForum.svg';
import MenuItemLeaders from '../../../assets/menuItemLeaders.svg';
import MenuItemRules from '../../../assets/menuItemRules.svg';
import CollapseIcon from './CollapseIcon.svg';

const menuItems = {
  game: {
    icon: <MenuItemGame />,
    route: '/game',
    label: 'Игра',
  },
  leaders: {
    icon: <MenuItemLeaders />,
    route: '/leaders',
    label: 'Лидеры',
  },
  forum: {
    icon: <MenuItemForum />,
    route: '/forum',
    label: 'Форум',
  },
  rules: {
    icon: <MenuItemRules />,
    route: '/rules',
    label: 'Правила',
  },
};

interface ChildProps {
  onChangeSidebar: (v: boolean) => void,
  isExpanded: boolean,
}

const Sidebar = ({ onChangeSidebar, isExpanded }: ChildProps) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const handleToggler = () => {
    if (isExpanded) {
      onChangeSidebar(false);
      return;
    }
    onChangeSidebar(true);
  };

  const handleSelectedListItem = (index: number, path: string) => {
    setActive(index);
    navigate(`/${path}`);
  };

  return (
    <div className={isExpanded ? 'sidebar' : 'sidebar_collapsed'}>
      <ul className="sidebar__menu">
        {Object.entries(menuItems).map((item, index) => {
          return (
            <li
              key={item[0]}
              role="presentation"
              className={
                `${active === index ? 'sidebar__menu-item_selected' : 'sidebar__menu-item'}
             ${isExpanded ? 'sidebar__menu-item' : 'sidebar__menu-item_collapsed'}`
              }
              onClick={() => handleSelectedListItem(index, item[0])}
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
