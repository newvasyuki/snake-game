import React from 'react';
import './LeaderInfo.pcss';

type Props = {
  position: number;
  userName: string;
  login: string;
  snakeLength: number;
};

const getLeaderInfo = (
  position: number,
  name: string,
  login: string,
): string => `${position}. ${name} (${login})`;

const LeaderInfo: React.FC<Props> = ({
 position, userName, login, snakeLength,
}) => {
  return (
    <div className="leader">
      <div className="leader__info">
        {getLeaderInfo(position, userName, login)}
      </div>
      <div className="leader__snake-length">{snakeLength}</div>
    </div>
);
};

export default LeaderInfo;
