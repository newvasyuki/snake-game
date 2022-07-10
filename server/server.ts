import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import session from 'express-session';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import morgan from 'morgan';
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
  secret: process.env.COOKIE_SECRET ?? 'secret',
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
app.use(morgan('combined'));
app.use('/forumAPI', (req: Request, res: Response, next: NextFunction) => {
  return createProxyMiddleware({
    target: `${`${req.protocol}://${req.headers.host}`}${API_V1}/forum/`,
    secure: false,
    pathRewrite: {
      '^/forumAPI': '', // removes /forumAPI
    },
  })(req, res, next);
});

app.use(session(sess));
app.use(express.static(path.resolve(__dirname, '../../')));
app.use(express.json());
app.use(API_V1, configureApiRouter(), [errorHandler]);
app.use(render());

export { app };
