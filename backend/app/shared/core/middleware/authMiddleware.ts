import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import minimatch from 'minimatch';

import { JWT_SECRET } from '../config';
import { logger } from '../logger';
import { TokenPayload } from '../../types/common';
import { removeQueryStringIfExist } from '../../utils/helpers';
import { NOT_AUTHENTICATED } from '../../utils/constants';

const allowedRoutes: string[] = [
  '/',
  '/health',
  '/documentation*',
  '/documentation/*',
  '/api/**',
  '/private/users/auth',
];

const decodeJwtToken = (token: string, jwtSecret: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject): void => {
    jwt.verify(token, jwtSecret, (err: jwt.VerifyErrors | null, decoded) => {
      if (err) {
        reject(err);
      }

      resolve(decoded as JwtPayload);
    });
  });
};

const isAuthorizedRoute = (currentRoute: string): boolean => {
  return allowedRoutes.some((route) => minimatch(currentRoute, route));
};

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  let routeName = '';

  if (req.originalUrl) {
    routeName = removeQueryStringIfExist(req.originalUrl);
  } else {
    return res.status(401).json({ message: NOT_AUTHENTICATED });
  }

  if (isAuthorizedRoute(routeName)) {
    return next();
  }

  const token = req.headers['authorization'];

  if (token) {
    try {
      const decoded = (await decodeJwtToken(token.replace('Bearer ', ''), JWT_SECRET)) as TokenPayload | undefined;

      if (!decoded?.id || !decoded?.role) {
        return res.status(401).json({ message: NOT_AUTHENTICATED });
      }

      req.user = decoded;

      return next();
    } catch (err) {
      logger.error(err);
    }
  }

  return res.status(401).json({ message: NOT_AUTHENTICATED });
};
