import { NextFunction, Response, Request } from 'express';
import { saveTopicToDb } from './service';
import { TopicInput } from './types';

interface Query {
  userId: string;
}

export async function createTopic(
  req: Request<unknown, unknown, unknown, Query>,
  res: Response,
  next: NextFunction,
) {
  const topic = req.body as TopicInput;
  const userId = Number.parseInt(req.query.userId, 10);
  try {
    await saveTopicToDb(topic, userId);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
}
