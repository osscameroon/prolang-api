import { NextFunction, Request, Response } from 'express';
import requestLogService from '../../../domain/services/requestLog.service';
import { CreateRequestLogInput } from '../../types/models';
import { selectRequestType } from '../../utils/helpers';
import { getDurationInMilliseconds } from '../../utils/request';

/**
 * @link https://ipirozhenko.com/blog/measuring-requests-duration-nodejs-express/
 *
 * @param req
 * @param res
 * @param next
 */
export const logRequestMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  /*const { connection, ip, url } = req;

  const input: CreateRequestLogInput = {
    endpoint: url,
    ipAddress: connection?.remoteAddress || ip,
    type: selectRequestType(url),
  };

  await requestLogService.create(input);

  return next();*/
  const { connection, ip, url } = req;
  const start = process.hrtime();

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
