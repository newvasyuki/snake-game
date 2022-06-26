import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from '../../../utils/shared/constants';
import { postCommentToDb } from './service';

import { CommentInput } from './types';

interface Query {
  userId: string;
}

interface Params {
  id: number;
}

export async function postComment(
  req: Request<unknown, unknown, unknown, Query>,
  res: Response,
  next: NextFunction,
) {
  const comment = req.body as CommentInput;
  const { userId } = req.session;
  const { id } = req.params as Params;
  try {
    await postCommentToDb(comment, userId, id);
    res.status(StatusCodes.SUCCESS).send();
  } catch (err) {
    next(err);
  }
}
