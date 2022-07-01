import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from '../../../utils/shared/constants';
import { saveCommentToDb } from './service';

import { CommentInput } from './types';

interface Query {
  userId: string;
}

interface Params {
  id: number;
}

export async function createComment(
  req: Request<unknown, unknown, unknown, Query>,
  res: Response,
  next: NextFunction,
) {
  const comment = req.body as CommentInput;
  const { user } = req.session;
  const { id } = req.params as Params;
  try {
    await saveCommentToDb(comment, user.id, id);
    res.status(StatusCodes.SUCCESS).send();
    res.status(200).send();
  } catch (err) {
    next(err);
  }
}
