import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import App from './app';
import { startServiceWorker } from './services/serviceWorker/serviceWorker';
import './styles/global.pcss';
import { configureStore } from './store';

const initialState = window.INITIAL_STATE;
const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/dot-notation
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;
const { store } = configureStore(initialState, composeEnhancers);

ReactDOM.hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

startServiceWorker();
