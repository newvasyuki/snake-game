import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from '../../../utils/shared/constants';
import { postTopicToDb } from './service';
import { TopicInput } from './types';

interface Query {
  userId: string;
}

export async function postTopic(
  req: Request<unknown, unknown, unknown, Query>,
  res: Response,
  next: NextFunction,
) {
  const topic = req.body as TopicInput;
  const { userId } = req.session;
  try {
    await postTopicToDb(topic, userId);
    res.status(StatusCodes.SUCCESS).send();
  } catch (err) {
    next(err);
  }
}
