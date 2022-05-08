import React from 'react';
import './Logo.pcss';
import LogoSVG from './logo.react.svg';

interface Props {
  isSmall: boolean
}

const Logo = ({ isSmall = false }: Props) => {
  return (
    <div className={isSmall ? 'logo-wrapper_collapsed' : 'logo-wrapper'}>
      <LogoSVG />
    </div>
  );
};

export default Logo;
