import path from 'path';
import express from 'express';
import session from 'express-session';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import render from './render';
import { dbConnect } from '../db/init';
import { configureApiRouter } from './api/routes/apiRouter';
import { errorHandler } from './utils/error/errorHandler';
import swaggerProd from '../swaggerProd.json';
import swaggerDev from '../swaggerDev.json';

const app = express();
const API_V1 = '/api/v1';

const sess = {
  name: 'forumCookie',
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
  },
};

// set up connection to DB
(async () => {
  await dbConnect();
})();

if (app.get('env') === 'production') {
  sess.cookie.secure = true;
}
if (app.get('env') === 'development' && parseInt(process.env.SKIP_FORUM_AUTH, 10)) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDev as JsonObject));
} else {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerProd as JsonObject));
}
app.use(session(sess));
app.use(express.static(path.resolve(__dirname, '../../')));
app.use(express.json());
app.use(API_V1, configureApiRouter(), [errorHandler]);
app.use(render());
// test
// test 2

export { app };
