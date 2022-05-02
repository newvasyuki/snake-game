import React from 'react';
import './Game.pcss';
import { Layout } from '../../components/Layout';

export default function Game() {
  return (
    <Layout>
      <div className={'game'}>
        This is a game!
      </div>
    </Layout>
  )
}