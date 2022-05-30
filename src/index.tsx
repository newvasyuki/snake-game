import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
// import { startServiceWorker } from './services/serviceWorker/serviceWorker';
import './styles/global.pcss';

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

// startServiceWorker();
