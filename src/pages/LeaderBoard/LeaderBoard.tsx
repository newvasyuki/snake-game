import React from 'react';
import './LeaderBoard.pcss';
import { LeaderInfo } from './components/LeaderInfo';

const leaders = [
  {
    playerName: 'Иван',
    login: 'stellar01',
    snakeLength: 20,
    position: 1,
  },
  {
    playerName: 'Андрей',
    login: 'ninja',
    snakeLength: 16,
    position: 2,
  },
  {
    playerName: 'Nikolay',
    login: 'Kolya',
    snakeLength: 10,
    position: 3,
  },
  {
    playerName: 'Alex',
    login: 'NoName',
    snakeLength: 8,
    position: 4,
  },
];

const LeaderBoard = () => {
  return (
    <div className="leaderboard">
      <div className="leaderboard__tbl">
        <div className="leaderboard__raw_header">
          <div className="leaderboard__cell_player">Игрок</div>
          <div className="leaderboard__cell_snakelength">Длина змейки</div>
        </div>
        {leaders.map((leader, i) => (
          <LeaderInfo
            key={`${leader.login}${i + 1}`}
            position={leader.position}
            userName={leader.playerName}
            login={leader.login}
            snakeLength={leader.snakeLength}
          />
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
