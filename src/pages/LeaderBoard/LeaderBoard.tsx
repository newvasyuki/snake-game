import React from 'react';
import { Layout } from '../../components/Layout';
import './LeaderBoard.pcss'
import { ROUTES } from '../../constants';

const LeaderBoard = () => {
  const leaders = [
    {
      playerName: 'Иван',
      login: "stellar01",
      snakeLength: 20
    },
    {
      playerName: 'Андрей',
      login: "ninja",
      snakeLength: 16
    },
    {
      playerName: 'Nikolay',
      login: "Kolya",
      snakeLength: 10
    },
    {
      playerName: 'Alex',
      login: "NoName",
      snakeLength: 8
    }
  ];

  return (
    <Layout selectedRoute={ROUTES.leaderboard}>
      <div className={'leaderboard'}>
        <div className={'leaderboard__tbl'}>
          <div className={'leaderboard__raw_header'}>
            <div className={'leaderboard__cell_player'}>Игрок</div>
            <div className={'leaderboard__cell_snakelength'}>Длина змейки</div>
          </div>
          {leaders.map((leader, i) => {
            return (
              <div className={'leaderboard__raw_content'}>
                <div className={'leaderboard__cell_player'}>{leader.playerName}({leader.login})</div>
                <div className={'leaderboard__cell_snakelength'}>{leader.snakeLength}</div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default LeaderBoard;
