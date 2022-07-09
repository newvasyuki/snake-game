import { Topic } from '../../../../db/models/topic';
import { RawTopics, TopicInput, Topics, CommentWtihChildren } from './types';
import { Comment } from '../../../../db/models/comment';
import { User } from '../../../../db/models/user';

function createTree(list: Comment[]) {
  if (list.length === 0) {
    return [];
  }
  const listCopy = list.map((node) => {
    return {
      id: node.id,
      topicId: node.topicId,
      content: node.content,
      date: node.date,
      user: node.user,
      parentId: node.parentId,
      children: [],
    };
  });
  const map: Record<string, number> = {};
  const roots: CommentWtihChildren[] = [];

  for (let i = 0; i < listCopy.length; i++) {
    map[listCopy[i].id] = i;
  }

  for (let i = 0; i < listCopy.length; i++) {
    const node = listCopy[i];
    if (node.parentId) {
      const reversedIndex = map[node.parentId];
      listCopy[reversedIndex].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

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
      user: rawTopic.user,
      likes: rawTopic.likes,
      comments: createTree(rawTopic.comments),
    }),
  );
  return topics;
};

export const loadTopics = async () => {
  const rawTopics = await Topic.findAll({
    include: [
      { model: Comment, include: [User] },
      { model: User, required: false },
    ],
  });
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
