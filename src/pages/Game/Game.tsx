import React from 'react';
import './Game.pcss';
import { Game as GameMechanics } from '../../components/Game';
import { Progress } from './components/Progress';

const Game = () => {
  return (
    <div className="game-page">
      <GameMechanics />
      <Progress />
    </div>
  );
};

export default Game;
