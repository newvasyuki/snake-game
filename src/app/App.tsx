import { hot } from 'react-hot-loader';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GamePage } from '../pages/GamePage';
import { Profile } from '../pages/Profile';
import { ROUTES } from '../constants';
import { Forum } from '../pages/Forum';
import LeaderBoard from '../pages/LeaderBoard/LeaderBoard';
import Error404 from '../pages/Error404';
import { Layout } from '../components/Layout';
import { Registration } from '../pages/Registration';
import { ProtectedRoutes } from '../components/ProtectedRoutes';
import { PublicRoutes } from '../components/PublicRoutes';
import { Login } from '../pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<ProtectedRoutes />}>
        <Route path={ROUTES.home} element={<Layout />}>
          <Route path={ROUTES.leaderboard} element={<LeaderBoard />} />
          <Route path={ROUTES.forum} element={<Forum />} />
          <Route path={ROUTES.rules} element={<h1>Rules</h1>} />
          <Route path={ROUTES.game} element={<GamePage />} />
          <Route path="*" element={<Error404 />} />
        </Route>
        <Route path={ROUTES.profile} element={<Profile />} />
      </Route>

      <Route path={ROUTES.home} element={<PublicRoutes />}>
        <Route path={ROUTES.signUp} element={<Registration />} />
        <Route path={ROUTES.signIn} element={<Login />} />
      </Route>
    </Routes>
  );
};

export default hot(module)(App);
