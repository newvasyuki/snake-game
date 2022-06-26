import { NextFunction, Response, Request } from 'express';
import axios from 'axios';
import { User } from '../../utils/shared/types';
import { BASE_URL, StatusCodes } from '../../utils/shared/constants';

export const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    next();
  } else {
    if (!req.headers.cookie) {
      throw new Error('No yandex cookie!'); // todo : use a special class
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
        console.error('error message: ', err.message);
        if (parseInt(err.status, 10) === StatusCodes.UNAUTHORIZED) {
          res.status(StatusCodes.FORBIDDEN).send({
            message: err.message,
          });
        }
      } else {
        console.error('unexpected error: ', err);
        next(err);
      }
    }
  }
};
