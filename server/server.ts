import path from 'path';
import express from 'express';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import session from 'express-session';
import render from './render';
import { dbConnect } from '../db/init';
import { configureApiRouter } from './api/routes/apiRouter';
import swaggerDoc from '../swagger.json';
import { errorHandler, resourceNotFound } from './utils/error/errorHandler';

const app = express();

const sess = {
  name: 'forumCookie',
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
  },
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true;
}

// set up connection to DB
(async () => {
  await dbConnect();
})();

app.use(session(sess));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc as JsonObject));
app.use(express.static(path.resolve(__dirname, '../../')));
app.use(express.json());
app.use(configureApiRouter(), [resourceNotFound, errorHandler]);
app.use(render());

export { app };
