import React from 'react';
import { Provider } from 'react-redux';
import { Request, Response } from 'express';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { configureStore } from '../../src/store';
import { getScriptName, getHtml } from './utils';

const isDev = process.env.NODE_ENV === 'development';

export default (req: Request, res: Response) => {
  console.log('rendermiddleware startnig');
  console.log('NODE_ENV', process.env.NODE_ENV);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { devMiddleware } = res.locals.webpack;
  const script = getScriptName(devMiddleware, 'client', isDev);
  console.log('script', script);

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

  res.status(200).send(getHtml(reactHtml, reduxState, script));
};
