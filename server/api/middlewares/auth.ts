import { NextFunction, Response, Request } from 'express';
import axios from 'axios';
import { User } from '../../utils/shared/types';
import { BASE_URL } from '../../utils/shared/constants';
import { ForbiddenError } from '../../utils/error/ForbiddenError';
import { errorHandler } from '../../utils/error/errorHandler';

export async function authorizeUser(req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) {
    next();
  }
  if (!req.headers.cookie) {
    return next(new ForbiddenError('User cannot be authorized'));
  }
  // Просим яндекс провeрить юзера по куке
  try {
    const opts = {
      headers: {
        Accept: 'application/json',
        cookie: 'req.headers.cookie', // пробрасываем куку яндекса (authCookie)
      },
    };
    const { data } = await axios.get<User>(`${BASE_URL}/auth/user`, opts);
    req.session.userId = data.id;
    next();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return next(new ForbiddenError('User cannot be authorized'));
    }
    return next(err);
  }
  return false;
}
