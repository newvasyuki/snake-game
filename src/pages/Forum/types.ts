import { User } from '../../api/user/types';

export type ForumUser = Pick<User, 'avatar' | 'first_name' | 'second_name'>;

export type CommentType = {
  id: number;
  topicId: number;
  content: string;
  date: number;
  userId: number;
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
  user: number;
  likes: number;
  comments: CommentType[];
};

export type Threads = ThreadType[];
