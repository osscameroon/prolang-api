import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';

import { commonRoute } from './routes/common.route';
import { yearGroupRoute } from './routes/yearGroup.route';
import { notFoundMiddleware } from '../shared/core/middleware/notFound';
import { authorRoute } from './routes/author.route';
import { languageRoute } from './routes/language.route';
import { logRequestMiddleware } from '../shared/core/middleware/logRequest';
import { rateLimiterMiddleware } from '../shared/core/middleware/rateLimiter';
import { Sentry } from '../shared/core/sentry';
import { errorHandlerMiddleware } from '../shared/core/middleware/errorMiddleware';
import { AUTH_ENABLED, SENTRY_ENABLED } from '../shared/core/config';
import { authMiddleware } from '../shared/core/middleware/authMiddleware';
import { userRoute } from './routes/user.route';

export const setupRestEndpoints = (app: Application) => {
  const router = express.Router();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.set('trust proxy', true);

  if (SENTRY_ENABLED) {
    app.use(Sentry.Handlers.requestHandler());
  }
  app.use(rateLimiterMiddleware);

  if (AUTH_ENABLED) {
    app.use(authMiddleware);
  }

  app.use(logRequestMiddleware);

  app.use('/', router);
  app.use('/', commonRoute());
  app.use('/api', yearGroupRoute());
  app.use('/api', authorRoute());
  app.use('/api', languageRoute());
  app.use('/private', userRoute());

  app.use(express.static(path.join(__dirname, '../../public')));

  app.use(notFoundMiddleware);

  if (SENTRY_ENABLED) {
    app.use(Sentry.Handlers.errorHandler());
  }

  app.use(errorHandlerMiddleware);
};
