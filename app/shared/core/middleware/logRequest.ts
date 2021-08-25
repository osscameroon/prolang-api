import { NextFunction, Request, Response } from 'express';
import requestLogService from '../../../domain/services/requestLog.service';
import { CreateRequestLogInput } from '../../types/models';
import { selectRequestType } from '../../utils/helpers';

export const logRequestMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { ip, url } = req;

  const input: CreateRequestLogInput = {
    endpoint: url,
    ipAddress: ip,
    type: selectRequestType(url),
  };

  await requestLogService.create(input);

  return next();
};
