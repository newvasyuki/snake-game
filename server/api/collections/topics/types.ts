import { Comment } from '../../../../db/models/comment';

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
  userId: number;
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
  user: number;
  likes: number;
  comments: CommentWtihChildren[];
};

export type Topics = Topic[];

export interface CommentWtihChildren {
  id: number;
  topicId: number;
  content: string;
  date: number;
  userId: number;
  parentId: number;
  children: Comment[];
}
