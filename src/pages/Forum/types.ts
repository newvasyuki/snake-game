import { ForumUser } from '../../api/user/types';

export type CommentType = {
  id: number;
  topicId: number;
  content: string;
  date: number;
  author: ForumUser;
  children: CommentType[];
  parentId: number;
};

export type ThreadType = {
  id: number;
  date: number;
  content: {
    title: string;
    message: string;
  };
  author: ForumUser;
  likes: number;
  comments: CommentType[];
};

export type Threads = ThreadType[];
