import { Router } from 'express';

import * as yearGroupController from '../controllers/yearGroup.controller';
import { generateRoutePrefix } from '../../shared/utils/helpers';

const yearGroupRoute = () => {
  const [publicPrefix] = generateRoutePrefix('years-groups');

  const router = Router();

  router.get(`${publicPrefix}`, yearGroupController.getAll);

  router.get(`${publicPrefix}/:id`, yearGroupController.getOne);

  return router;
};

export { yearGroupRoute };
