import React, { useState } from "react";
import './Sidebar.pcss';
import MenuItemGame from '../../../assets/menuItemGame.svg';
import MenuItemForum from '../../../assets/menuItemForum.svg';
import MenuItemLeaders from '../../../assets/menuItemLeaders.svg';
import MenuItemRules from '../../../assets/menuItemRules.svg';
import CollapseIcon from './CollapseIcon.svg';
import { Logo } from '../Logo';

const listToIcons = {
  Игра: <MenuItemGame />,
  Лидеры: <MenuItemLeaders />,
  Форум: <MenuItemForum />,
  Правила: <MenuItemRules />
}

// todo: connect with Router
const listToLinks = {
  game: '/game',
  leaders: '/leaders',
  forum: '/forum',
  rules: '/rules'
}

export default function Sidebar() {

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

  return (
    <div className={isExpanded ? 'sidebar' : 'sidebar_collapsed'}>
      <div className={isExpanded ? 'sidebar__logo' : 'sidebar__logo_collapsed'}>
        <Logo isSmall={!isExpanded} />
      </div>
      <ul className={'sidebar__menu'}>

        {Object.entries(listToIcons).map((item, index) => {
          return (
            <li className={
              `${active === item[0] ? 'sidebar__menu-item_selected' : 'sidebar__menu-item'}
             ${isExpanded ? 'sidebar__menu-item' : 'sidebar__menu-item_collapsed'}`
            }
              key={index} onClick={handleSelectedListItem}>
              <div className={'sidebar__menu__item-icon'}>
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
      <div className={'sidebar__collapse-icon'}>
        <CollapseIcon
          onClick={handleToggler}
          className={isExpanded ? '' : 'sidebar__collapse-icon_collapsed'}
        />
      </div>
    </div>
  )
}
