import { Router } from 'express';

import * as yearGroupController from '../controllers/yearGroup.controller';

const yearGroupRoute = () => {
  const prefix = '/years-groups';
  const router = Router();

  router.get(`${prefix}`, yearGroupController.getAll);

  router.get(`${prefix}/:id`, yearGroupController.getOne);

  return router;
};

export { yearGroupRoute };
