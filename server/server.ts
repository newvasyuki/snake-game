import path from 'path';
import express from 'express';
import render from './render';

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));

app.use(render());

export { app };
