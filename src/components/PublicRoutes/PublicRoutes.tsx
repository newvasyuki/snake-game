import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { setUserInfoAsync, setUserInfoOAuthAsync } from '../../store/actionCreators';

const PublicRoutes = () => {
  const { user, isUserLoading } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      const redirectUrl = `${window.location.href.split('/').slice(0, -1).join('/')}/`;
      dispatch(setUserInfoOAuthAsync({ code, redirect_uri: redirectUrl }));
    } else {
      dispatch(setUserInfoAsync());
    }
  }, [dispatch, searchParams]);
  if (isUserLoading || isUserLoading === undefined || isUserLoading === null) {
    return null;
  }
  return user ? <Navigate to={ROUTES.game} /> : <Outlet />;
};

export default PublicRoutes;
