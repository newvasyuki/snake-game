import React from "react";
import './Logo.pcss';
import LogoBig from './logo.react.svg';
import LogoSmall from './logoSmall.react.svg';

interface Props {
  isSmall: boolean
}

export default function Logo(props: Props) {
  if (props.isSmall) {
    return <LogoSmall className={'logo'} />
  }
  return <LogoBig className={'logo'} />
}