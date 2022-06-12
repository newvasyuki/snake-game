export type LeaderData = {
  data: {
    firstName: string;
    login: string;
    snakeScore: number;
  };
  ratingFieldName: string;
};

export type GetAllLeaderBoard = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

type LeaderResponse = {
  data: {
    login: string;
    firstName: string;
    snakeScore: number;
  };
};

export type LeadersResponse = LeaderResponse[];
