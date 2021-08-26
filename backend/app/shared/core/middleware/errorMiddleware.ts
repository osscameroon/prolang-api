import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from '../../utils/constants';
import { logger } from '../logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlerMiddleware = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(error, false);

  return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
};
