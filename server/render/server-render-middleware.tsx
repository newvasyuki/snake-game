import React from 'react';
import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { configureStore } from '../../src/store';
import { Provider } from 'react-redux';
import path from 'path';
// import App from '../../src/app';
// import App from '../../../build/ssr.client.js';

function getHtml(reactHtml: string, state = {}, script: string) {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Snake Game</title>
      </head>
      <body>
          <div id="root">${reactHtml}</div>
          <script>
            window.INITIAL_STATE = ${JSON.stringify(state)}
          </script>
          <script src="${script}"></script>
      </body>
      </html>
  `;
}

export default (req: Request, res: Response) => {
  console.log('rendermiddleware startnig');
  console.log('path', path.resolve(__dirname, '../../../ssr.client.js'));
  console.log('NODE_ENV', process.env.NODE_ENV);
  // console.log(App);
  const { store } = configureStore();
  const { devMiddleware } = res.locals.webpack;
  const jsonWebpackStats = devMiddleware.stats.toJson();
  // console.log(jsonWebpackStats);
  const { assetsByChunkName } = jsonWebpackStats;
  const script = assetsByChunkName.client[0];
  // console.log('assetsByChunkName', assetsByChunkName);
  console.log('script', script);

  delete require.cache[require.resolve(path.resolve(__dirname, '../../../ssr.client.js'))];

  const App = require(path.resolve(__dirname, '../../../ssr.client.js')).default;

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
