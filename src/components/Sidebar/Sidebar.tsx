import React, { useState } from "react";
import './Sidebar.pcss';
import MenuItemGame from '../../../assets/menuItemGame.react.svg';
import MenuItemForum from '../../../assets/menuItemForum.react.svg';
import MenuItemLeaders from '../../../assets/menuItemLeaders.react.svg';
import MenuItemRules from '../../../assets/menuItemRules.react.svg';
import CollapseIcon from './CollapseIcon.react.svg';
import Logo from '../Logo';

export default function Sidebar() {
  const listToIcons = {
    Игра: <MenuItemGame />,
    Лидеры: <MenuItemLeaders />,
    Форум: <MenuItemForum />,
    Правила: <MenuItemRules />
  }

  // todo: connect with Router
  const listToLinks = {
    Игра: '/game',
    Лидеры: '/leaders',
    Форум: '/forum',
    Правила: '/rules'
  }

  const [isExpanded, setIsExpanded] = useState(true);
  const [active, setActive] = useState('Игра');

  const handleToggler = () => {
    if (isExpanded) {
      setIsExpanded(false);
      return;
    }
    setIsExpanded(true);
  }

  const handleSelectedListItem = (e: React.MouseEvent) => {
    setActive((e.target as HTMLElement).innerText);
  }

  return <div className={isExpanded ? 'sidebar' : 'sidebar_collapsed'}>
    <div className={isExpanded ? 'sidebar__logo' : 'sidebar__logo_collapsed'}>
      <Logo isSmall={!isExpanded} />
    </div>
    <ul className={'sidebar__menu'}>

      {Object.entries(listToIcons).map((item, index) => {
        return (
          <li className={
            `${active === item[0] ? 'sidebar__menuItem_selected' : 'sidebar__menuItem'}
             ${isExpanded ? 'sidebar__menuItem' : 'sidebar__menuItem_collapsed'}`
          }
            key={index} onClick={handleSelectedListItem}>
            <div className={'sidebar__menuItemIcon'}>
              {item[1]}
            </div>
            <div className={isExpanded ? '' : 'sidebar__text_collapsed'}>
              {item[0]}
            </div>
          </li>
        )
      })
      }
    </ul>
    <div className={'sidebar__collapseIcon'}>
      <CollapseIcon
        onClick={handleToggler}
        className={isExpanded ? '' : 'sidebar__collapseIcon_collapsed'}
      />
    </div>
  </div>
}
