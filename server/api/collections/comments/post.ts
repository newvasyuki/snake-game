import { NextFunction, Response, Request } from 'express';
import { postCommentToDb } from './service';

import { CommentInput } from './types';

export async function postComment(req: Request, res: Response, next: NextFunction) {
  const comment = req.body as CommentInput;
  try {
    await postCommentToDb(comment);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
}
