import path from 'path';
import express from 'express';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import render from './render';
import { dbConnect } from '../db/init';
import { configureApiRouter } from './api/routes/apiRouter';
import swaggerDoc from '../swagger.json';

const app = express();
const API_V1 = '/api/v1';

// set up connection to DB
(async () => {
  await dbConnect();
})();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc as JsonObject));
app.use(express.static(path.resolve(__dirname, '../../')));
app.use(express.json());
app.use(API_V1, configureApiRouter(), []); // todo: create safety net for 404, or 500
app.use(render());

export { app };
