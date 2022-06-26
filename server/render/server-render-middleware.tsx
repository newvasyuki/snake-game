import React from 'react';
import { Provider } from 'react-redux';
import { Request, Response } from 'express';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { configureStore } from '../../src/store';
import { getScriptName, getHtml } from './utils';
import { StatusCodes } from '../utils/shared/constants';

const isDev = process.env.NODE_ENV === 'development';

export default (req: Request, res: Response) => {
  const script = getScriptName(res.locals.webpack, 'client', isDev);

  if (isDev) {
    delete require.cache[require.resolve(path.resolve(__dirname, '../../../ssr.client.js'))];
  }

  // eslint-disable-next-line
  const App = require(path.resolve(__dirname, '../../../ssr.client.js')).default;

  const { store } = configureStore();
  const location = req.url;
  const reduxState = store.getState();

  const jsx = (
    <Provider store={store}>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </Provider>
  );
  const reactHtml = renderToString(jsx);

  res.status(StatusCodes.SUCCESS).send(getHtml(reactHtml, reduxState, script));
};
