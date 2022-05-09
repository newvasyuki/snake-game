import React from 'react';
import './Game.pcss';
import { Screen } from './components/Screen';
import { Progress } from './components/Progress';

const Game = () => {
  return (
    <div className="game">
      <Screen />
      <Progress />
    </div>
  );
};

export default Game;
