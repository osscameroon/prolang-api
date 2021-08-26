import { Router } from 'express';

import * as userController from '../controllers/user.controller';

const userRoute = () => {
  const prefix = '/users';
  const router = Router();

  router.post(`${prefix}/auth`, userController.login);

  router.get(`${prefix}`, userController.getAll);

  router.get(`${prefix}/me`, userController.current);

  router.get(`${prefix}/:id`, userController.getOne);

  return router;
};

export { userRoute };
