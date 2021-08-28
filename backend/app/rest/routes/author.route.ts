import { Router } from 'express';

import * as authorController from '../controllers/author.controller';
import { generateRoutePrefix } from '../../shared/utils/helpers';

const authorRoute = () => {
  const [publicPrefix, privatePrefix] = generateRoutePrefix('authors');

  const router = Router();

  router.get(`${publicPrefix}`, authorController.search);

  router.get(`${publicPrefix}/all`, authorController.getAll);

  router.get(`${publicPrefix}/:id`, authorController.getOne);

  router.post(`${privatePrefix}`, authorController.create);

  router.put(`${privatePrefix}/:id`, authorController.update);

  router.delete(`${privatePrefix}/:id`, authorController.remove);

  return router;
};

export { authorRoute };
