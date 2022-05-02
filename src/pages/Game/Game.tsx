import React from 'react';
import './Game.pcss';
import { Layout } from '../../components/Layout';
import Screen from './components/Screen';
import Progress from './components/Progress';

export default function Game() {
  return (
    <Layout>
      <div className={'game'}>
        <Screen />
        <Progress />
      </div>
    </Layout>
  )
}
