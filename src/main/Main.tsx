import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants';

const innerPagesUrl = [ROUTES.game, ROUTES.leaderboard, ROUTES.forum, ROUTES.rules, ROUTES.profile];

const Main = () => {
  return (
    <div>
      <h1>MainPage</h1>
      <ul>
        {innerPagesUrl.map((page) => (
          <li key={page}>
            <Link to={`${page}`}>
              To
              {page.replace('/', '')}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default Main;
