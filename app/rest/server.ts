import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';

import { commonRoute } from './routes/common.route';
import { yearGroupRoute } from './routes/yearGroup.route';
import { notFoundMiddleware } from '../shared/core/middleware/notFound';
import { authorRoute } from './routes/author.route';

export const setupRestEndpoints = (app: Application) => {
  const router: express.Router = express.Router();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  // app.use(errorHandlerMiddleware);

  app.use('/', router);
  app.use('/', commonRoute());
  app.use('/api', yearGroupRoute());
  app.use('/api', authorRoute());

  app.use(express.static(path.join(__dirname, '../../public')));

  app.use(notFoundMiddleware);
};
