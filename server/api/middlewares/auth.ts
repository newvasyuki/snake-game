import { NextFunction, Response, Request } from 'express';
import axios from 'axios';
import { User } from '../../utils/shared/types';
import { BASE_URL } from '../../utils/shared/constants';
import { ForbiddenError } from '../../utils/error/ForbiddenError';

function forbiddenError() {
  return new ForbiddenError('User cannot be authorized');
}

export const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    return next();
  }
  if (!req.headers.cookie) {
    return next(forbiddenError());
  }
  // Просим яндекс провeрить юзера по куке
  try {
    const opts = {
      headers: {
        Accept: 'application/json',
        cookie: req.headers.cookie, // пробрасываем куку яндекса (authCookie)
      },
    };
    const { data } = await axios.get<User>(`${BASE_URL}/auth/user`, opts);
    req.session.userId = data.id;
    next();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      next(forbiddenError());
    } else {
      console.error('unexpected error: ', err);
      next(err);
    }
  }
};
