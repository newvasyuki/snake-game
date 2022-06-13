import path from 'path';
import express from 'express';
import render from './render';
// import sredner from './render/server-render-middleware';
// import clientConfig from '../../webpack/client.config';

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));

// app.get('/*', render);
app.use(render());

export { app };
