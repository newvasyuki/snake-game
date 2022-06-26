// Add headers before the routes are defined
import { NextFunction, Response, Request } from 'express';

export const cors = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://snake.ya-praktikum.tech:5000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // Pass to next layer of middleware
  next();
};
