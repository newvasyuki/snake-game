import { Comment } from '../../../../db/models/comment';
import { User } from '../../../../db/models/user';

export type TopicInput = {
  title: string;
  content: string;
  userId: number;
};

export type RawTopic = {
  content: string;
  date: number;
  id: number;
  likes: number;
  title: string;
  user: User;
  comments: Comment[];
};

export type RawTopics = RawTopic[];

export type Topic = {
  id: number;
  date: Date;
  content: {
    title: string;
    message: string;
  };
  user: User;
  likes: number;
  comments: CommentWtihChildren[];
};

export type Topics = Topic[];

export interface CommentWtihChildren {
  id: number;
  topicId: number;
  content: string;
  date: number;
  user: User | string;
  parentId: number;
  children: Comment[];
}
