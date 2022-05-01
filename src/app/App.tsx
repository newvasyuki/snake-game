import React from "react";
import { Main } from "../main";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants";
import Profile from "../pages/Profile/Profile";
import '../constants/constants.pcss';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Main />}>
          <Route path={ROUTES.game} element={<h1>Game</h1>} />
          <Route path={ROUTES.leaderboard} element={<h1>LeaderBoard</h1>} />
          <Route path={ROUTES.forum} element={<h1>Forum</h1>} />
          <Route path={ROUTES.rules} element={<h1>Rules</h1>} />
        </Route>
        <Route
          path={ROUTES.profile}
          element={<Profile />}
        />
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
        <Route
          path="*"
          element={
            <>
              <h1>404</h1>
              <Link to={ROUTES.home}>Go to main</Link>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
