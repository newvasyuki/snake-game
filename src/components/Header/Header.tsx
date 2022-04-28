import React from "react";
import './Header.pcss';
import Logo from '../Logo';

export default function Header() {
  return <div className={'header'}>
    <div className={'header__logo'}>
      <Logo />
    </div>
    <div className={'header__description'}>
      Собери как можно длинную змейку!
    </div>
  </div>
}