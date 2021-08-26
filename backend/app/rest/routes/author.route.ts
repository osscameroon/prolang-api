import { Router } from 'express';

import * as authorController from '../controllers/author.controller';

const authorRoute = () => {
  const prefix = '/authors';
  const router = Router();

  router.get(`${prefix}`, authorController.search);

  router.get(`${prefix}/all`, authorController.getAll);

  router.get(`${prefix}/:id`, authorController.getOne);

  return router;
};

export { authorRoute };
