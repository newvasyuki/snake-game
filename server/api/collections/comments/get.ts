import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from '../../../utils/shared/constants';
import { loadComments } from './service';

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topicId = parseInt(req.params.id, 10);
    const comments = await loadComments(topicId);
    res.status(StatusCodes.SUCCESS).send(comments);
  } catch (err) {
    next(err);
  }
};
