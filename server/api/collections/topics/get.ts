import { NextFunction, Response, Request } from 'express';

export async function getTopic(req: Request, res: Response, next: NextFunction) {
  try {
    const topic = await loadTopic(req.params.topicId);
  } catch (err) {
    next(err);
  }
}
