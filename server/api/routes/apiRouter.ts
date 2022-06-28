import { Router } from 'express';
import { getComments } from '../collections/comments/get';
import { postComment } from '../collections/comments/post';
import { getTopics } from '../collections/topics/get';
import { postTopic } from '../collections/topics/post';
import { authorizeUser } from '../middlewares/auth';
import { logout } from './logout';

const API_V1 = '/api/v1';

export function configureApiRouter() {
  const router: Router = Router();

  router.get(`${API_V1}/forum/topics`, [authorizeUser], getTopics);
  router.post(`${API_V1}/forum/topics`, [authorizeUser], postTopic);
  router.get(`${API_V1}/forum/topics/:id(\\d+)/comments`, [authorizeUser], getComments);
  router.post(`${API_V1}/forum/topics/:id(\\d+)/comments`, [authorizeUser], postComment);
  router.post(`${API_V1}/forum/logout`, [authorizeUser], logout);

  return router;
}
