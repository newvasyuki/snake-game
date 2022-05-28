import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '../../constants';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { setUserInfoAsync } from '../../store/actionCreators';

const PublicRoutes = () => {
  const { user, isUserLoading } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(setUserInfoAsync());
  }, [dispatch]);

  if (isUserLoading || isUserLoading === undefined || isUserLoading === null) {
    return null;
  }
  return user ? <Navigate to={ROUTES.game} /> : <Outlet />;
};

export default PublicRoutes;
