import { Topic } from 'store/reducers/forum';

const mockText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, pariatur libero illo,
exercitationem excepturi esse maxime illum, consequatur voluptatem repellendus quod?
Dicta adipisci facere, repellat eveniet vel dignissimos molestiae asperiores.`;

const mockAnswers = [
  {
    id: '1',
    userId: 1,
    date: new Date().toISOString(),
    message: mockText,
  },
  {
    id: '2',
    userId: 2,
    date: new Date().toISOString(),
    message: mockText,
  },
  {
    id: '3',
    userId: 3,
    date: new Date().toISOString(),
    message: mockText,
  },
];

const getMockThread = (index: number): Topic => {
  return {
    id: String(index),
    date: new Date().toISOString(),
    title: 'Mock title',
    content: mockText,
    userId: 4,
    likes: Math.round(Math.random() * 3000),
    answers: mockAnswers,
  };
};

export const getMockThreads = (count: number): Topic[] => {
  return new Array(count).fill(1).map((_, index) => getMockThread(index));
};
