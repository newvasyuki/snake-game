import { NextFunction, Response, Request } from 'express';
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
  const userId = Number.parseInt(req.query.userId, 10);
  const { id } = req.params as Params;
  try {
    await saveCommentToDb(comment, userId, id);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
}
