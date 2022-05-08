import React from 'react';
import './Header.pcss';
import { Logo } from '../Logo';
import { ProfileHelper } from './ProfileHelper';

interface IProps {
  isLogoSmall: boolean;
}

const Header = ({ isLogoSmall = false }: IProps) => {
  return (
    <div className="header">
      <Logo isSmall={isLogoSmall} />
      <div className="header__description">
        Собери как можно длинную змейку!
      </div>
      <ProfileHelper />
    </div>
  );
};

export default Header;
