import React from 'react';
import './Game.pcss';
import { Layout } from '../../components/Layout';
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
