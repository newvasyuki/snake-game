import { Router } from 'express';
import { getComments } from '../collections/comments/get';
import { createComment } from '../collections/comments/post';
import { getTopics } from '../collections/topics/get';
import { authorizeUser } from '../middlewares/auth';
import { logout } from './logout';
import { createTopic } from '../collections/topics/post';
import { setTheme } from '../collections/themes/post';
import { getTheme } from '../collections/themes/get';

export function configureApiRouter() {
  const router: Router = Router();

  router.get(`/forum/topics`, [authorizeUser], getTopics);
  router.post(`/forum/topics`, [authorizeUser], createTopic);
  router.get(`/forum/topics/:id(\\d+)/comments`, [authorizeUser], getComments);
  router.post(`/forum/topics/:id(\\d+)/comments`, [authorizeUser], createComment);
  router.post(`/forum/logout`, [authorizeUser], logout);
  router.get(`/theme/`, getTheme);
  router.post(`/theme/:id(\\d+)`, setTheme);

  return router;
}
