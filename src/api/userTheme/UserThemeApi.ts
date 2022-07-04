import { isError } from 'utils/types';
import { SNAKE_SERVER_URL } from '../../constants';
import { Themes } from './types';

export function setUserTheme(themeId: Themes, userId: number) {
  return fetch(`${SNAKE_SERVER_URL}/theme/${themeId}?userId=${userId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Theme cannot be set for a user');
    })
    .catch((error: unknown) => {
      if (isError(error)) {
        console.error(error);
      }
      throw error;
    });
}

export function getTheme(userId: number) {
  return fetch(`${SNAKE_SERVER_URL}/theme?userId=${userId}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Cannot get a them for a user ${userId}`);
    })
    .then((data: { themeId: number }) => data)
    .catch((error: unknown) => {
      if (isError(error)) {
        console.error(error);
      }
      throw error;
    });
}
