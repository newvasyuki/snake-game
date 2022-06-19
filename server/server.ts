import path from 'path';
import express from 'express';
import render from './render';
import { dbConnect } from './db/init';

const app = express();

dbConnect().then(() => {
  app.use(express.static(path.resolve(__dirname, '../../')));

  app.use(render());
});

export { app };
