import { NextFunction, Response, Request } from 'express';
import { getThemeForUser } from './service';
import { StatusCodes } from '../../../utils/shared/constants';

interface Query {
  userId: string;
}

export async function getTheme(
  req: Request<unknown, unknown, unknown, Query>,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = parseInt(req.query.userId, 10);
    const theme = await getThemeForUser(userId);
    res.status(StatusCodes.SUCCESS).send(theme);
  } catch (err) {
    next(err);
  }
}
