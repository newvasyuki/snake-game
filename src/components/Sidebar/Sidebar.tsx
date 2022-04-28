import React from "react";
import './Sidebar.pcss';
import MenuItemGame from './MenuItemGame.svg';
import MenuItemForum from './MenuItemForum.svg';
import MenuItemLeaders from './MenuItemLeaders.svg';
import MenuItemRules from './MenuItemRules.svg';
import Logo from '../Logo';

export default function Sidebar() {
  return <div className={'sidebar'}>
    <ul className={'sidebar__menu'}>
      <li className={'sidebar__menuItem_selected'}>
        <div className={'sidebar__menuItemIcon'}>
          <MenuItemGame />
        </div>
        Игра
      </li>
      <li className={'sidebar__menuItem'}>
        <div className={'sidebar__menuItemIcon'}>
          <MenuItemLeaders />
        </div>
        Лидеры
      </li>
      <li className={'sidebar__menuItem'}>
        <div className={'sidebar__menuItemIcon'}>
          <MenuItemForum />
        </div>
        Форум
        </li>
      <li className={'sidebar__menuItem'}>
        <div className={'sidebar__menuItemIcon'}>
          <MenuItemRules />
        </div>
        Правила</li>
    </ul>
  </div>
}