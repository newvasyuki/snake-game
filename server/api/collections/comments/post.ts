import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from '../../../utils/shared/constants';
import { upsertUser } from '../users';
import { saveCommentToDb } from './service';

import { CommentInput } from './types';

interface Params {
  id?: string;
}
interface Query {
  userId?: string;
}

export async function createComment(
  req: Request<Params, unknown, unknown, Query>,
  res: Response,
  next: NextFunction,
) {
  const comment = req.body as CommentInput;
  const { user } = req.session;
  const { id } = req.params;
  try {
    await upsertUser(user);
    await saveCommentToDb(comment, user.id, parseInt(id, 10));
    res.status(StatusCodes.SUCCESS).send();
    res.status(200).send();
  } catch (err) {
    next(err);
  }
}
