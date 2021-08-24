import { QueryResolvers } from '../../types/types';
import authorService from '../../../domain/services/author.service';
import { transformAuthorResponse } from '../../../domain/responses/author.response';
import { AuthorResponse } from '../../../shared/types/responses';

export const allAuthors: QueryResolvers['allAuthors'] = async () => {
  const result = await authorService.findAll();

  return transformAuthorResponse(result) as AuthorResponse[];
};
