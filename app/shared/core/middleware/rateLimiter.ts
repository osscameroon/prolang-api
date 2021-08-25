import { NextFunction, Request, Response } from 'express';
import { IRateLimiterOptions, RateLimiterMemory } from 'rate-limiter-flexible';

import { TOO_MANY_REQUESTS_MESSAGE } from '../../utils/constants';
import { MAX_REQUEST_LIMIT } from '../config';

const options: IRateLimiterOptions = {
  duration: 10, // MAX_REQUEST_WINDOW, // Per 15 minutes by IP
  points: 1, // MAX_REQUEST_LIMIT, // 100 requests
};

const rateLimiter = new RateLimiterMemory(options);

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  rateLimiter
    .consume(req.ip)
    .then((rateLimiterRes) => {
      res.setHeader('Retry-After', rateLimiterRes.msBeforeNext / 1000);
      res.setHeader('X-RateLimit-Limit', MAX_REQUEST_LIMIT);
      res.setHeader('X-RateLimit-Remaining', rateLimiterRes.remainingPoints);
      res.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString());
      next();
    })
    .catch(() => {
      res.status(429).json({ message: TOO_MANY_REQUESTS_MESSAGE });
    });
};
