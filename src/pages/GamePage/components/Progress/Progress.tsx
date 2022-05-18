import React from 'react';
import './Progress.pcss';

const Progress = () => {
  return (
    <div className="progress">
      <div className="progress__score">
        <span>Счет</span>
        <span>184</span>
      </div>
      <div className="progress__record">
        <span>Рекорд</span>
        <span>184</span>
      </div>
    </div>
  );
};

export default Progress;
