import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '../../constants';
import { useTypedSelector } from '../../store';

const PublicRoutes = () => {
  const userInfo = useTypedSelector((state) => state.user.user);
  return userInfo ? <Navigate to={ROUTES.game} /> : <Outlet />;
};

export default PublicRoutes;
