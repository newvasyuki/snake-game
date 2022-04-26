import React from "react";
import { Link, Outlet } from "react-router-dom";

const innerPagesUrl = ["game", "leaderboard", "forum", "rules", "profile"];

export const Main = () => {
  return (
    <div>
      <h1>MainPage</h1>
      <ul>
        {innerPagesUrl.map((page) => (
          <li key={page}>
            <Link to={`/${page}`}>To {page}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};
