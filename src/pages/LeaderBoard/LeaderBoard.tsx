import React, { useEffect } from 'react';
import './LeaderBoard.pcss';
import { LeaderInfo } from './components/LeaderInfo';
import { selectLeaders } from '../../store/selectors';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { setLeaders } from '../../store/actionCreators';

const LeaderBoard = () => {
  const leaders = useTypedSelector(selectLeaders);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(setLeaders());
  }, [dispatch]);

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
            position={i + 1}
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
