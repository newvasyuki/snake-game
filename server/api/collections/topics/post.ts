import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from '../../../utils/shared/constants';
import { upsertUser } from '../users';
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
  const { user } = req.session;
  try {
    // todo - в идеале эти операции должны быть в транзакции
    await upsertUser(user);
    await saveTopicToDb(topic, user.id);
    res.status(StatusCodes.SUCCESS).send();
  } catch (err) {
    next(err);
  }
}
