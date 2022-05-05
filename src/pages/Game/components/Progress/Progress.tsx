import React from 'react';
import './Progress.pcss';

const Progress = () => {
  return (
    <div className="progress-block">
      <div className="progress-block__score">
        <span>Счет</span>
        <span>184</span>
      </div>
      <div className="progress-block__record">
        <span>Рекорд</span>
        <span>184</span>
      </div>
    </div>
  );
};

export default Progress;
