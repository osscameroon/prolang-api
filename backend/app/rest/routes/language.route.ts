import { Router } from 'express';

import * as languageController from '../controllers/language.controller';

const languageRoute = () => {
  const prefix = '/languages';
  const router = Router();

  router.get(`${prefix}`, languageController.search);

  router.get(`${prefix}/all`, languageController.getAll);

  router.get(`${prefix}/:idOrName`, languageController.getByIdOrName);

  router.get(`${prefix}/years-groups/:name`, languageController.getByYearGroup);

  return router;
};

export { languageRoute };
