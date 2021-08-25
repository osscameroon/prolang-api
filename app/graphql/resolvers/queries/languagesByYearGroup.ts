import { ApolloError } from 'apollo-server-express';

import { QueryResolvers } from '../../types/types';
import languageService from '../../../domain/services/language.service';
import { PAGINATION_LIMIT } from '../../../shared/core/config';
import yearGroupService from '../../../domain/services/yearGroup.service';
import { RECORD_NOT_FOUND_CODE, RECORD_NOT_FOUND_MESSAGE } from '../../../shared/utils/constants';

export const languagesByYearGroup: QueryResolvers['languagesByYearGroup'] = async (_context, args) => {
  const { name, page, search } = args;

  const yearGroup = await yearGroupService.findByName(name);

  if (!yearGroup) {
    throw new ApolloError(RECORD_NOT_FOUND_MESSAGE('YearGroup', name), RECORD_NOT_FOUND_CODE);
  }

  return await languageService.findByYearGroup(yearGroup._id, page || 1, PAGINATION_LIMIT, search || undefined);
};
