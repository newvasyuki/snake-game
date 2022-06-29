import { Router } from 'express';
import { getComments } from '../collections/comments/get';
import { createComment } from '../collections/comments/post';
import { getTopics } from '../collections/topics/get';
import { createTopic } from '../collections/topics/post';

export function configureApiRouter() {
  const router: Router = Router();

  router.get(`/forum/topics`, getTopics);
  router.post(`/forum/topics`, createTopic);
  router.get(`/forum/topics/:id(\\d+)/comments`, getComments);
  router.post(`/forum/topics/:id(\\d+)/comments`, createComment);

  return router;
}
