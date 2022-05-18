import React, { useEffect, useRef, useState } from 'react';
import bemCn from 'bem-cn-lite';
import { Game } from '../../components/Game';
import { Progress } from './components/Progress';
import { StartButton } from './components/StartButton';
import './GamePage.pcss';

const block = bemCn('game-page');

const calculateSize = (wrapper: HTMLElement) => {
  const { width: wrapperWidth, height: wrapperHeight } = wrapper.getBoundingClientRect();
  const { border } = getComputedStyle(wrapper);

  const width = Math.round(Math.floor(wrapperWidth) - 2 * parseFloat(border));
  const height = Math.round(Math.floor(wrapperHeight) - 2 * parseFloat(border));

  return { width, height };
};

const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const wrapperRef = useRef<HTMLDivElement>();

  const [game, setGame] = useState<Game>();
  const [width, setWidth] = useState<number>();
  const [height, setHeigth] = useState<number>();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const size = calculateSize(wrapperRef.current);
    const gridSize = {
      width: 10,
      height: 10,
    };

    setWidth(size.width);

    setHeigth(size.height);

    const newGame = new Game(canvasRef.current, size, gridSize);

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

export default GamePage;
