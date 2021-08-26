import { CreateRequestLogInput } from '../../shared/types/models';
import { RequestLogModel } from '../models/requestLog.model';

const create = async (input: CreateRequestLogInput) => {
  return RequestLogModel.create(input);
};

export default {
  create,
};
