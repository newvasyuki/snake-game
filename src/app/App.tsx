import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { GamePage } from '../pages/GamePage';
import { Profile } from '../pages/Profile';
import { ROUTES } from '../constants';
import { Forum } from '../pages/Forum';
import LeaderBoard from '../pages/LeaderBoard/LeaderBoard';
import Error404 from "../pages/Error404";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Layout />}>
          <Route path={ROUTES.leaderboard} element={<LeaderBoard />} />
          <Route path={`${ROUTES.forum}/*`} element={<Forum />} />
          <Route path={ROUTES.rules} element={<h1>Rules</h1>} />
          <Route path={ROUTES.game} element={<GamePage />} />
          <Route path="*" element={<Error404 />}/>
        </Route>
        <Route path={ROUTES.signUp} element={<Registration />} />
        <Route path={ROUTES.profile} element={<Profile />} />
        <Route
          path={ROUTES.signIn}
          element={
            <>
              <h1>SignIn</h1>
              <Link to={ROUTES.home}>Go to main</Link>
            </>
          }
        />
        <Route
          path={ROUTES.signUp}
          element={
            <>
              <h1>SignUp</h1>
              <Link to={ROUTES.home}>Go to main</Link>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
