import { QueryResolvers } from '../../types/types';
import languageService from '../../../domain/services/language.service';
import { PAGINATION_LIMIT } from '../../../shared/core/config';

export const languages: QueryResolvers['languages'] = async (_context, args) => {
  const { page, search } = args;

  return await languageService.findPaginate(page || 1, PAGINATION_LIMIT, search || undefined);
};
