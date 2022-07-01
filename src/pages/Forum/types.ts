import { User } from '../../api/user/types';

export type ForumUser = Pick<User, 'avatar' | 'first_name' | 'second_name'>;

type Comment = {
  id: number;
  topicId: number;
  content: string;
  date: number;
  userId: number;
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
  comments: Comment[];
};

export type Threads = ThreadType[];
