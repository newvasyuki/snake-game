import React, { useEffect, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../../../store';
import { setLeaders } from '../../../../store/actionCreators';
import { selectLeaders } from '../../../../store/selectors';
import './Progress.pcss';

type Props = {
  score?: number;
};

const Progress = ({ score }: Props) => {
  const [record, setRecord] = useState<number>(null);

  const leaders = useTypedSelector(selectLeaders);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(setLeaders());
  }, [dispatch]);

  useEffect(() => {
    setRecord(leaders[0]?.snakeLength);
  }, [leaders]);

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
