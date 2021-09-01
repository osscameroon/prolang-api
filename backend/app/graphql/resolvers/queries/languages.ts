import { QueryResolvers } from '../../types/types';
import languageService from '../../../domain/services/language.service';
import { PAGINATION_LIMIT } from '../../../shared/core/config';
import yearGroupService from '../../../domain/services/yearGroup.service';

export const languages: QueryResolvers['languages'] = async (_context, args) => {
  const { page, search, yearGroupName } = args;

  let yearGroup = null;

  if (yearGroupName) {
    yearGroup = await yearGroupService.findByName(yearGroupName);
  }

  return languageService.findPaginate(
    page || 1,
    PAGINATION_LIMIT,
    search || undefined,
    undefined,
    undefined,
    yearGroup?._id,
  );
};
