import React, { useEffect, useRef, useState } from 'react';
import bemCn from 'bem-cn-lite';
import { Game as GameMechanics } from '../../components/Game';
import { Progress } from './components/Progress';
import './Game.pcss';
import { StartButton } from './components/StartButton';

const block = bemCn('game-page');

const calculateSize = (wrapper: HTMLElement) => {
  const { width: wrapperWidth, height: wrapperHeight } = wrapper.getBoundingClientRect();
  const { border } = getComputedStyle(wrapper);

  const width = Math.round(Math.floor(wrapperWidth) - 2 * parseFloat(border));
  const height = Math.round(Math.floor(wrapperHeight) - 2 * parseFloat(border));

  return { width, height };
};

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const wrapperRef = useRef<HTMLDivElement>();

  const [game, setGame] = useState<GameMechanics>();
  const [width, setWidth] = useState<number>();
  const [height, setHeigth] = useState<number>();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const { width: calculatedWidth, height: calculatedHeight } = calculateSize(wrapperRef.current);

    setWidth(calculatedWidth);

    setHeigth(calculatedHeight);

    const newGame = new GameMechanics(canvasRef.current, calculatedWidth, calculatedHeight);

    setGame(newGame);

    newGame.subscribeEvent('start', () => setIsStarted(true));
    newGame.subscribeEvent('end', () => setIsStarted(false));

    return () => {
      newGame.destroy();
    };
  }, []);

  return (
    <div className={block()}>
      <div className={block('game-screen', { active: isStarted })} ref={wrapperRef}>
        <canvas id="snake" ref={canvasRef} width={width} height={height} />
        {isStarted ? null : (
          <StartButton
            onClick={() => {
              game?.startGame();
            }}
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          game?.pauseGame();
        }}
      >
        Pause
      </button>
      <Progress />
    </div>
  );
};

export default Game;
