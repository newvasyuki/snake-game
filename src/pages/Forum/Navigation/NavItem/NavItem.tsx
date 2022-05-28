import React, { PropsWithChildren } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import bemCn from 'bem-cn-lite';
import './NavItem.pcss';

type OwnProps = Pick<NavLinkProps, 'to'>;

type Props = PropsWithChildren<OwnProps>;

const block = bemCn('forum-nav-item');

export const NavItem = ({ to, children }: Props) => {
  return (
    <NavLink className={({ isActive }) => (isActive ? block({ active: true }) : block())} to={to}>
      {children}
    </NavLink>
  );
};
