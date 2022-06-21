import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { setUserInfoAsync, setUserInfoOAuthAsync } from '../../store/actionCreators';

const ProtectedRoutes = () => {
  const { user, isUserLoading } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      const redirectUrl = `${window.location.origin}/`;
      dispatch(setUserInfoOAuthAsync({ code, redirect_uri: redirectUrl })).then(() => {
        navigate(ROUTES.game);
      });
    } else if (!user) {
      dispatch(setUserInfoAsync());
    }
  }, [dispatch, navigate, searchParams, user]);

  if (isUserLoading || isUserLoading === undefined || isUserLoading === null) {
    return null;
  }
  return user ? <Outlet /> : <Navigate to={ROUTES.signUp} />;
};

export default ProtectedRoutes;
