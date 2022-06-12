import React, { useEffect, useState } from 'react';
import { fetchLeaders } from '../../../LeaderBoard/LeaderBoard';
import './Progress.pcss';

type Props = {
  score?: number;
};

const Progress = ({ score }: Props) => {
  const [record, setRecord] = useState<number>(null);

  useEffect(() => {
    fetchLeaders(1).then((collectedLeaders) => setRecord(collectedLeaders[0].snakeLength));
  }, []);

  return (
    <div className="progress">
      <div className="progress__score">
        <span>Счет</span>
        <span>{score}</span>
      </div>
      <div className="progress__record">
        <span>Рекорд</span>
        <span>{record}</span>
      </div>
    </div>
  );
};

export default Progress;
