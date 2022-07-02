import { Topic } from '../../../../db/models/topic';
import { TopicInput } from './types';

export const loadTopics = async () => {
  return Topic.findAll();
};

export const saveTopicToDb = async (topic: TopicInput, userId: number) => {
  return Topic.create({
    title: topic.title,
    content: topic.content,
    likes: 0,
    date: new Date().getTime(),
    userId,
  });
};
