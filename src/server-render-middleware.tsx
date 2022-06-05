import React from 'react';
import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './app';

function getHtml(reactHtml: string) {
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
          <script src="/index.js"></script>
      </body>
      </html>
  `;
}

export default (req: Request, res: Response) => {
  const location = req.url;

  const jsx = (
    <StaticRouter location={location}>
      <App />
    </StaticRouter>
  );
  const reactHtml = renderToString(jsx);

  res.status(200).send(getHtml(reactHtml));
};
