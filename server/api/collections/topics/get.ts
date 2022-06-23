import { NextFunction, Response, Request } from 'express';
import { loadTopics } from './service';

export const getTopics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topics = await loadTopics();
    res.status(200).send(topics);
    next();
  } catch (err) {
    next(err);
  }
};
