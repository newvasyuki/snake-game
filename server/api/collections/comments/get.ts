import { NextFunction, Response, Request } from 'express';
import { loadComments } from './service';

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topicId = parseInt(req.params.id, 10);
    const comments = await loadComments(topicId);
    res.status(200).send(comments);
  } catch (err) {
    next(err);
  }
};
