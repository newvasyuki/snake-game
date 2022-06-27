import { Response, Request } from 'express';
import { ApiError } from './ApiError';

export function errorHandler(err: ApiError, req: Request, res: Response) {
  const errCode = err.errCode || 500;
  res.status(errCode).send({
    message: err.message,
  });
}
