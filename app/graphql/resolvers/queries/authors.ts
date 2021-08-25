import { QueryResolvers } from '../../types/types';
import { PAGINATION_LIMIT } from '../../../shared/core/config';
import authorService from '../../../domain/services/author.service';

export const authors: QueryResolvers['authors'] = async (_context, args) => {
  const { page, search } = args;

  return authorService.findPaginate(page || 1, PAGINATION_LIMIT, search);
};
