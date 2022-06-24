import { Router } from 'express';
import { getComments } from '../collections/comments/get';
import { postComment } from '../collections/comments/post';
import { getTopics } from '../collections/topics/get';
import { postTopic } from '../collections/topics/post';

const API_V1 = '/api/v1';

export function configureApiRouter() {
  const router: Router = Router();

  router.get(`${API_V1}/forum/topics`, getTopics);
  router.get(`${API_V1}/forum/topics/:id(\\d+)/comments`, getComments);
  router.post(`${API_V1}/forum/topics`, postTopic);
  router.post(`${API_V1}/forum/topics/:id(\\d+)/comments`, postComment);

  return router;
}
