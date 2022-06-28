import { FORUM_URL } from '../../constants';
import { isError } from '../../utils/types';
import { TopicData } from './types';

export function postForumTopic(topicData: TopicData) {
  return fetch(`${FORUM_URL}/forum/topics`, {
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
