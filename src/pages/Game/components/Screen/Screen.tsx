import React, { useState } from 'react';
import './Screen.pcss';

const Screen = () => {
  const [isStarted] = useState(false);

  return (
    <div className={isStarted ? 'screen screen--active' : 'screen'}>
      <canvas id="snake" />
      <div className="screen__btn-start">
        <span>Старт!</span>
      </div>
    </div>
  );
};

export default Screen;
