import path from 'path';
import express from 'express';
import fallback from 'express-history-api-fallback';

// const path = require('path');
// const express = require('express');
// const fallback =  require('express-history-api-fallback');

const app = express();
const root = path.join(__dirname, 'build');
app.use(express.static(root));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(fallback('index.html', { root }));
app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  const address = server.address();

  const port = typeof address === 'string' ? address : address.port;
  // eslint-disable-next-line no-console
  console.log('listening on port ', port);
});
