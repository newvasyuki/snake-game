import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { startServiceWorker } from './services/serviceWorker/serviceWorker';
import './styles/global.pcss';

ReactDOM.render(<App />, document.getElementById('root'));

startServiceWorker();
