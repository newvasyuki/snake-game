import React from "react";
import { Main } from "../main";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="game" element={<h1>Game</h1>} />
          <Route path="leaderboard" element={<h1>LeaderBoard</h1>} />
          <Route path="forum" element={<h1>Forum</h1>} />
          <Route path="rules" element={<h1>Rules</h1>} />
        </Route>
        <Route
          path="/profile"
          element={
            <>
              <h1>Profile</h1>
              <Link to="/">Go to main</Link>
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <h1>SignIn</h1>
              <Link to="/">Go to main</Link>
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <h1>SignUp</h1>
              <Link to="/">Go to main</Link>
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <h1>404</h1>
              <Link to="/">Go to main</Link>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
