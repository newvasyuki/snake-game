import { BASE_URL } from '../../constants';
import { isError } from '../../utils/types';
import { LeaderDataWithRatingField, GetAllLeaderBoard, LeadersResponse } from './types';

export function newLeader(leaderData: LeaderDataWithRatingField) {
  return fetch(`${BASE_URL}/leaderboard`, {
    method: 'POST',
    body: JSON.stringify(leaderData),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Leadeboard data cannot be added');
    })
    .then((data: string) => data)
    .catch((error: unknown) => {
      if (isError(error)) {
        console.error(error);
      }
    });
}

export function getAllLeaderboard(leaderboardAllData: GetAllLeaderBoard) {
  return fetch(`${BASE_URL}/leaderboard/all`, {
    method: 'POST',
    body: JSON.stringify(leaderboardAllData),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('leaderboard all data cannot be retrieved');
    })
    .then((data: string) => {
      if (data) {
        return JSON.parse(data) as LeadersResponse;
      }
      return [];
    })
    .catch((error: unknown) => {
      if (isError(error)) {
        console.error(error);
      }
    });
}
