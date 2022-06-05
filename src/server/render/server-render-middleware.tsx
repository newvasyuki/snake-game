import React from 'react';
import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { configureStore } from 'store';
import { Provider } from 'react-redux';
import App from '../../app';

function getHtml(reactHtml: string, state = {}) {
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
          <script src="/client.js"></script>
      </body>
      </html>
  `;
}

export default (req: Request, res: Response) => {
  console.log('rendermiddleware startnig');
  console.log(res.locals);
  const { store } = configureStore();
  // const { devMiddleware } = res.locals.webpack;
  // const jsonWebpackStats = devMiddleware.stats.toJson();
  // const { assetsByChunkName } = jsonWebpackStats;
  // const script = assetsByChunkName
  // console.log('assetsByChunkName', assetsByChunkName);
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

  res.status(200).send(getHtml(reactHtml, reduxState));
};
