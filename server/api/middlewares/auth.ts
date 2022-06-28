import { NextFunction, Response, Request } from 'express';
import axios from 'axios';
import { User } from '../../utils/shared/types';
import { BASE_URL } from '../../utils/shared/constants';
import { ForbiddenError } from '../../utils/error/ForbiddenError';

export async function authorizeUser(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === 'development' && process.env.FORUM !== 'DEV_MODE') {
    // для дев среды без форума пропускаем авторизацию
    next();
  }
  if (req.session.user) {
    // юзер уже авторизован, пропускаем дальше
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
        cookie: req.headers.cookie, // пробрасываем куку яндекса (authCookie)
      },
    };
    const { data } = await axios.get<User>(`${BASE_URL}/auth/user`, opts);
    req.session.user = data;
    next();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return next(new ForbiddenError('User cannot be authorized'));
    }
    return next(err);
  }
  return false;
}
