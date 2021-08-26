import mongoose from 'mongoose';
import { ApolloError } from 'apollo-server-express';

import { QueryResolvers } from '../../types/types';
import yearGroupService from '../../../domain/services/yearGroup.service';
import { RECORD_NOT_FOUND_CODE, RECORD_NOT_FOUND_MESSAGE } from '../../../shared/utils/constants';

export const oneYearGroup: QueryResolvers['oneYearGroup'] = async (_context, args) => {
  const { idOrName } = args;
  const isObjectId = mongoose.Types.ObjectId.isValid(idOrName);

  const item = await (isObjectId ? yearGroupService.findById(idOrName) : yearGroupService.findByName(idOrName));

  if (!item) {
    throw new ApolloError(RECORD_NOT_FOUND_MESSAGE('YearGroup', idOrName), RECORD_NOT_FOUND_CODE);
  }

  return item;
};
