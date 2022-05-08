import React from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from 'react-router-dom';
import Main from '../main';
import { Game } from '../pages/Game';
import { Profile } from '../pages/Profile';
import { Layout } from '../components/Layout';
import { ROUTES } from '../constants';
import LeaderBoard from '../pages/LeaderBoard/LeaderBoard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Layout />}>
          <Route path={ROUTES.leaderboard} element={<LeaderBoard />} />
          {/* <Route path="top" element={'top'} />
            <Route path="latest" element={'latest'} /> */}
          <Route path={ROUTES.rules} element={<h1>Rules</h1>} />
          <Route path={ROUTES.game} element={<Game />} />
        </Route>
        <Route
          path={ROUTES.profile}
          element={<Profile />}
        />
        <Route
          path={ROUTES.signIn}
          element={(
            <>
              <h1>SignIn</h1>
              <Link to={ROUTES.home}>Go to main</Link>
            </>
          )}
        />
        <Route
          path={ROUTES.signUp}
          element={(
            <>
              <h1>SignUp</h1>
              <Link to={ROUTES.home}>Go to main</Link>
            </>
          )}
        />
        <Route
          path="*"
          element={(
            <>
              <h1>404</h1>
              <Link to={ROUTES.home}>Go to main</Link>
            </>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
