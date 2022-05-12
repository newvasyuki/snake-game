import React, { useMemo, useRef, useState } from 'react';
import './Screen.pcss';

import { Game as GameMechanics } from '../../GameMechanics';

const StartButton = ({ onClick }) => {
  return (
    <button type="button" className="screen__btn-start" onClick={onClick}>
      Старт!
    </button>
  );
};

const Screen = () => {
  const [isStarted, setIsStarted] = useState(false);
  const ref = useRef(null);

  const game = useMemo(() => new GameMechanics(ref), [ref]);

  return (
    // <div className={isStarted ? 'screen screen--active' : 'screen'}>
    // </div>
    <>
      <canvas id="snake" ref={ref} />
      {isStarted ? null : (
        <StartButton
          onClick={() => {
            setIsStarted(true);
            game.startGame();
          }}
        />
      )}
    </>
  );
};

export default Screen;
