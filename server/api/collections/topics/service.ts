import { Topic } from '../../../../db/models/topic';
import { RawTopics, TopicInput, Topics } from './types';
import { Comment } from '../../../../db/models/comment';

const postProcessTopics = (rawTopics: RawTopics) => {
  const topics: Topics = [];
  rawTopics.forEach((rawTopic) =>
    topics.push({
      id: rawTopic.id,
      date: new Date(rawTopic.date),
      content: {
        title: rawTopic.title,
        message: rawTopic.content,
      },
      user: rawTopic.userId,
      likes: rawTopic.likes,
      comments: rawTopic.comments,
    }),
  );
  return topics;
};

export const loadTopics = async () => {
  const rawTopics = await Topic.findAll({ include: [Comment] });
  return postProcessTopics(rawTopics);
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
