import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './styles/global.pcss';
import { store } from './store';
import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
