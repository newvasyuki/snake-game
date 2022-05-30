import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '../../constants';
import { useTypedSelector } from '../../store';

const ProtectedRoutes = () => {
  const userInfo = useTypedSelector((state) => state.user.user);
  return userInfo ? <Outlet /> : <Navigate to={ROUTES.signUp} />;
};

export default ProtectedRoutes;
