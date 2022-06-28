import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from '../../utils/shared/constants';

export function logout(req: Request, res: Response, next: NextFunction) {
  req.session.user = null;
  req.session.save(function save(err) {
    if (err) next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function regenerate(e) {
      if (e) next(e);
      res.status(StatusCodes.SUCCESS).send();
    });
  });
}
