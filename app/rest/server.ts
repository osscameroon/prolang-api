import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';

import { commonRoute } from './routes/common.route';

export const setupRestEndpoints = (app: Application) => {
  const router: express.Router = express.Router();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  // app.use(errorHandlerMiddleware);

  app.use('/', router);
  app.use('/', commonRoute());

  // static content
  app.use(express.static(path.join(__dirname, '../../public')));

  // app.use(notFoundMiddleware);
};
