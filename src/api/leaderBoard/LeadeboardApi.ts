import { isError } from '../../utils/types';
import { LeaderData, GetAllLeaderBoard, LeadersResponse } from './types';

export class LeaderboardApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  newLeader(leaderData: LeaderData) {
    return fetch(`${this.baseUrl}/leaderboard`, {
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

  getAllLeaderboard(leaderboardAllData: GetAllLeaderBoard) {
    return fetch(`${this.baseUrl}/leaderboard/all`, {
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
}

export const leaderboardApi = new LeaderboardApi('https://ya-praktikum.tech/api/v2');
