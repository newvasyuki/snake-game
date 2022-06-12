import React, { useCallback, useEffect, useRef, useState } from 'react';
import bemCn from 'bem-cn-lite';
import { Game } from '../../components/Game';
import { Progress } from './components/Progress';
import { StartButton } from './components/StartButton';
import './GamePage.pcss';
import { addNewLeader } from '../../store/actionCreators';
import { useTypedDispatch, useTypedSelector } from '../../store';

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
  const blockRef = useRef<HTMLDivElement>();

  const [game, setGame] = useState<Game>();
  const [width, setWidth] = useState<number>();
  const [height, setHeigth] = useState<number>();
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState<number>(0);
  const dispatch = useTypedDispatch();
  const { user } = useTypedSelector((state) => state.user);

  const onGameEnd = useCallback(() => {
    setIsStarted(false);
    dispatch(
      addNewLeader({
        data: { firstName: user.first_name, login: user.login, snakeScore: score },
        ratingFieldName: 'snakeScore',
      }),
    );
  }, [dispatch, score, user.first_name, user.login]);

  useEffect(() => {
    if (game) {
      game.unsubscribeEvents();
      game.subscribeEvent('start', () => {
        setIsStarted(true);
      });
      game.subscribeEvent('end', onGameEnd);
      game.subscribeEvent('updateScore', (newScore: number) => {
        setScore(newScore);
      });
    }
  }, [game, onGameEnd]);

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
  }, []);

  const buttonFullScreen = () => {
    if (!document.fullscreenElement) {
      blockRef.current?.requestFullscreen();
    } else {
      document?.exitFullscreen();
    }
  };

  return (
    <div className={block()} ref={blockRef}>
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
      <div>
        <button
          type="button"
          onClick={() => {
            game?.pauseGame();
          }}
        >
          Pause
        </button>
        <Progress score={score} />
        <button type="button" className={block('btn-fullscreen')} onClick={buttonFullScreen}>
          Fullscreen
        </button>
      </div>
    </div>
  );
};

export default React.memo(GamePage);
