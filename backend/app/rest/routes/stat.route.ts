import { Router } from 'express';

import * as statController from '../controllers/stat.controller';
import { generateRoutePrefix } from '../../shared/utils/helpers';

const statRoute = () => {
  const [, privatePrefix] = generateRoutePrefix('stat');
  const router = Router();

  router.get(`${privatePrefix}/summary`, statController.summary);

  return router;
};

export { statRoute };
