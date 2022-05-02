import React, { useState } from 'react';
import './Screen.pcss';

export default function Screen() {

  const [isStarted] = useState(false);

  return <div className={isStarted ? 'screen screen--active' : 'screen'}>
    <canvas id="snake"></canvas>
    <div className={'screen__btn-start'}>
      <span>Старт!</span>
    </div>
  </div>
}
