import { QueryResolvers } from '../../types/types';
import authorService from '../../../domain/services/author.service';
import { transformAuthorResponse } from '../../../domain/responses/author.response';
import { AuthorResponse } from '../../../shared/types/responses';
import { PAGINATION_LIMIT } from '../../../shared/core/config';

export const authors: QueryResolvers['authors'] = async (_context, args) => {
  const { page, search } = args;
  const result = await authorService.findPaginate(page || 1, PAGINATION_LIMIT, search);

  return { ...result, items: transformAuthorResponse(result.items) as AuthorResponse[] };
};
