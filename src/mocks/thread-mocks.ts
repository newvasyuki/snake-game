import { ThreadType } from '../pages/Forum/Thread/Thread';
import { mockUserData } from './user-mock';

const mockText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, pariatur libero illo,
exercitationem excepturi esse maxime illum, consequatur voluptatem repellendus quod?
Dicta adipisci facere, repellat eveniet vel dignissimos molestiae asperiores.`;

const mockAnswers = [
  {
    id: '1',
    user: mockUserData,
    date: new Date(),
    message: mockText,
  },
  {
    id: '2',
    user: mockUserData,
    date: new Date(),
    message: mockText,
  },
  {
    id: '3',
    user: mockUserData,
    date: new Date(),
    message: mockText,
  },
];

const getMockThread = (index: number): ThreadType => {
  return {
    id: String(index),
    date: new Date(),
    content: {
      title: 'Mock title',
      message: mockText,
    },
    user: mockUserData,
    likes: Math.round(Math.random() * 3000),
    answers: mockAnswers,
  };
};

export const getMockThreads = (count: number): ThreadType[] => {
  return new Array(count).fill(1).map((_, index) => getMockThread(index));
};
