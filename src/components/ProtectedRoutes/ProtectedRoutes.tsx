import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '../../constants';
import { useTypedSelector } from '../../store';
import { selectIsLoggedIn } from '../../store/selectors';

const ProtectedRoutes = () => {
  const isLoggedIn = useTypedSelector(selectIsLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.signUp} />;
};

export default ProtectedRoutes;
