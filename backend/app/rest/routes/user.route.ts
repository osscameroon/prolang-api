import { Router } from 'express';

import * as userController from '../controllers/user.controller';
import { generateRoutePrefix } from '../../shared/utils/helpers';

const userRoute = () => {
  const [, privatePrefix] = generateRoutePrefix('users');
  const router = Router();

  router.post(`${privatePrefix}/auth`, userController.login);

  router.post(`${privatePrefix}`, userController.create);

  router.get(`${privatePrefix}`, userController.getAll);

  router.get(`${privatePrefix}/me`, userController.current);

  router.get(`${privatePrefix}/:id`, userController.getOne);

  router.put(`${privatePrefix}/:id`, userController.update);

  return router;
};

export { userRoute };
