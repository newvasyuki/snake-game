import React from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from 'react-router-dom';
import { Game } from '../pages/Game';
import { ROUTES } from '../constants';
import { Layout } from '../components/Layout';
import { Forum } from '../pages/Forum';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Layout />}>
          <Route path={ROUTES.leaderboard} element={<h1>LeaderBoard</h1>} />
          <Route path={`${ROUTES.forum}/*`} element={<Forum />}>
            {/* <Route path="top" element={'top'} />
            <Route path="latest" element={'latest'} /> */}
          </Route>
          <Route path={ROUTES.rules} element={<h1>Rules</h1>} />
          <Route path={ROUTES.game} element={<Game />} />
        </Route>
        <Route
          path={ROUTES.profile}
          element={(
            <>
              <h1>Profile</h1>
              <Link to={ROUTES.home}>Go to main</Link>
            </>
          )}
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
