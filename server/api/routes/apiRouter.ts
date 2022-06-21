import { Router, Response, Request } from 'express';
import { getTopic } from '../collections/topics/get';

const API_V1 = '/api/v1';

const getApiDocumentation = (req: Request, res: Response) => {
  res.status(200).send(['api/v1/forum/topics/{id}', 'api/v1/forum/topics/{id}/comments']);
};

export function configureApiRouter() {
  const router: Router = Router();

  router.get(`${API_V1}`, getApiDocumentation);
  router.get(`${API_V1}/forum/topics/:id`, getTopic);
}
