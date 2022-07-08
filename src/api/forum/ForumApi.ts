import { Threads } from 'pages/Forum/types';
import { FORUM_URL } from '../../constants';
import { isError } from '../../utils/types';
import { TopicData } from './types';

export function getForumTopics(): Promise<Threads> {
  return fetch(`${FORUM_URL}/forum/topics`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Forum topics cannot be retrieved');
      }
      return response.json();
    })
    .then((threads: Threads) => {
      return threads;
    })
    .catch((error: unknown) => {
      if (isError(error)) {
        console.error(error);
      }
      throw error;
    });
}

export function createForumTopic(topicData: TopicData, userId: number) {
  return fetch(`${FORUM_URL}/forum/topics?userId=${userId}`, {
    method: 'POST',
    body: JSON.stringify(topicData),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Forum topic cannot be created');
    })
    .catch((error: unknown) => {
      if (isError(error)) {
        console.error(error);
      }
    });
}

export function logoutForum() {
  return fetch(`${FORUM_URL}/forum/logout`, {
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
      throw new Error('Logout from forum faile');
    })
    .catch((error: unknown) => {
      if (isError(error)) {
        console.error(error);
      }
    });
}
