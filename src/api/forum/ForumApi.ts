import { Threads } from 'pages/Forum/types';
import { isError } from '../../utils/types';
import { CommentData, TopicData } from './types';

export function getForumTopics(userId): Promise<Threads> {
  return fetch(`/forumAPI/topics?userId=${userId}`, {
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
  return fetch(`/forumAPI/topics?userId=${userId}`, {
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
  return fetch(`/forumAPI/logout`, {
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

export function createForumComment(commentData: CommentData, userId: number) {
  return fetch(`/forumAPI/topics/${commentData.topicId}/comments?userId=${userId}`, {
    method: 'POST',
    body: JSON.stringify(commentData),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Topic comment cannot be created');
    })
    .catch((error: unknown) => {
      if (isError(error)) {
        console.error(error);
      }
    });
}
