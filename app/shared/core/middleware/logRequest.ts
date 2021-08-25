import { NextFunction, Request, Response } from 'express';
import requestLogService from '../../../domain/services/requestLog.service';
import { CreateRequestLogInput } from '../../types/models';
import { selectRequestType } from '../../utils/helpers';

export const logRequestMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { connection, ip, url } = req;

  const input: CreateRequestLogInput = {
    endpoint: url,
    ipAddress: connection?.remoteAddress || ip,
    type: selectRequestType(url),
  };

  await requestLogService.create(input);

  return next();
};
