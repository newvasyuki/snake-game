import { NextFunction, Response, Request } from 'express';
import { postTopicToDb } from './service';
import { TopicInput } from './types';

export async function postTopic(req: Request, res: Response, next: NextFunction) {
  const topic = req.body as TopicInput;
  try {
    await postTopicToDb(topic);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
}
