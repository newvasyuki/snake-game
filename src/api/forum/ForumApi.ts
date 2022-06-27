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
      throw new Error('leaderboard all data cannot be retrieved');
    })
    .catch((error: unknown) => {
      if (isError(error)) {
        console.error(error);
      }
    });
}
