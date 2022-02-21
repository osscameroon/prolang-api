import { NextFunction, Request, Response } from 'express';
import requestLogService from '../../../domain/services/requestLog.service';
import { CreateRequestLogInput } from '../../types/models';
import { isScamRoute, selectRequestType } from '../../utils/helpers';
import { getDurationInMilliseconds } from '../../utils/request';
import { CLIENT_ORIGIN } from '../config';

const isWhiteListedURL = (requestURL: string) => {
  console.log('youherelle => ', requestURL);
  const urls = ['/', '/health', '/spec/prolang.yaml'];

  return urls.includes(requestURL);
};

/**
 * @link https://ipirozhenko.com/blog/measuring-requests-duration-nodejs-express/
 *
 * @param req
 * @param res
 * @param next
 */
export const logRequestMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();
  const { connection, ip, url } = req;

  if (
    req.headers['x-client-origin'] === CLIENT_ORIGIN ||
    isScamRoute(req.originalUrl) ||
    isWhiteListedURL(req.originalUrl)
  ) {
    return next();
  }

  const input: CreateRequestLogInput = {
    duration: null,
    endpoint: url,
    ipAddress: connection?.remoteAddress || ip,
    statusCode: null,
    type: selectRequestType(url),
  };

  res.on('finish', async () => {
    input.duration = getDurationInMilliseconds(start);
    input.statusCode = res.statusCode;

    await requestLogService.create(input);
  });

  res.on('close', async () => {
    const isRequestFinished = Boolean(input.duration);

    if (!isRequestFinished) {
      input.duration = getDurationInMilliseconds(start);
      input.statusCode = 499; // Request aborted: defined by me

      await requestLogService.create(input);
    }
  });

  return next();
};
