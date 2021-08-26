import { Router } from 'express';

import * as statController from '../controllers/stat.controller';

const statRoute = () => {
  const prefix = '/stat';
  const router = Router();

  router.get(`${prefix}/summary`, statController.summary);

  return router;
};

export { statRoute };
