import React from "react";
import './Header.pcss';
import { Logo } from '../Logo';

export default function Header({isLogoSmall = false}) {
  
  return (
    <div className={'header'}>
      <Logo isSmall={isLogoSmall} />
      <div className={'header__description'}>
        Собери как можно длинную змейку!
      </div>
    </div>
  )
}