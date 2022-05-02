import React from "react";
import './Logo.pcss';
import LogoSVG from './logo.svg';

interface Props {
  isSmall: boolean
}

export default function Logo({ isSmall = false }: Props) {
  return (
    <div className={isSmall ? 'logo-wrapper_collapsed' : 'logo-wrapper'}>
      <LogoSVG />
    </div>
  )
}