import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from '../../../utils/shared/constants';
import { setThemeForUser } from './service';
import { Themes } from './types';

interface Query {
  userId: string;
}

interface Params {
  id: number;
}

export async function setTheme(
  req: Request<unknown, unknown, unknown, Query>,
  res: Response,
  next: NextFunction,
) {
  const themeId = (req.params as Params).id;
  const userId = parseInt(req.query.userId, 10);
  let themeName = '';
  switch (themeId) {
    case Themes.DARK:
      themeName = 'Dark theme';
      break;
    case Themes.LIGHT:
      themeName = 'Light theme';
      break;
    default:
      themeName = 'Light theme';
  }
  try {
    await setThemeForUser(themeId, themeName, userId);
    res.status(StatusCodes.SUCCESS).send();
  } catch (err) {
    next(err);
  }
}
