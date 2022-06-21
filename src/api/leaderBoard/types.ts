type LeaderData = {
  firstName: string;
  login: string;
  snakeScore: number;
};

export type LeaderDataWithRatingField = {
  data: LeaderData;
  ratingFieldName: string;
};

export type GetAllLeaderBoard = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

type LeaderResponse = {
  data: LeaderData;
};

export type LeadersResponse = LeaderResponse[];
