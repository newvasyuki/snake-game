import { NextFunction, Response, Request } from 'express';
import { ApiError } from './ApiError';
import { ResourceNotFoundError } from './ResourceNotFoundError';

export function errorHandler(err: ApiError, req: Request, res: Response) {
  const errCode = err.errCode || 500;
  res.status(errCode).send({
    message: err.message,
  });
}

export function resourceNotFound(req: Request, res: Response, next: NextFunction) {
  return next(new ResourceNotFoundError('Resource not found'));
}
