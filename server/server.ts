import path from 'path';
import express from 'express';
import render from './render';
import { dbConnect } from '../db/init';
import { configureApiRouter } from './api/routes/apiRouter';

const app = express();

// set up connection to DB
(async () => {
  await dbConnect();
})();

app.use(express.static(path.resolve(__dirname, '../../')));
app.use(express.json());
app.use(configureApiRouter(), []); // todo: create safety net for 404, or 500
app.use(render());

export { app };
