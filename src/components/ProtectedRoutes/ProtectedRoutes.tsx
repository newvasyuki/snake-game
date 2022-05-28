import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '../../constants';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { getUserInfo } from '../../store/actionCreators';

const ProtectedRoutes = () => {
  const { user, isUserLoading } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  if (isUserLoading || isUserLoading === undefined || isUserLoading === null) {
    return null;
  }
  return user ? <Outlet /> : <Navigate to={ROUTES.signUp} />;
};

export default ProtectedRoutes;
