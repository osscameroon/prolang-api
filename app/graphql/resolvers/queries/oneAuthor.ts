import { ApolloError } from 'apollo-server-express';

import { QueryResolvers } from '../../types/types';
import authorService from '../../../domain/services/author.service';
import { transformAuthorResponse } from '../../../domain/responses/author.response';
import { AuthorResponse } from '../../../shared/types/responses';
import { RECORD_NOT_FOUND_CODE, RECORD_NOT_FOUND_MESSAGE } from '../../../shared/utils/constants';

export const oneAuthor: QueryResolvers['oneAuthor'] = async (_context, args) => {
  const { id } = args;

  const item = await authorService.findById(id);

  if (!item) {
    throw new ApolloError(RECORD_NOT_FOUND_MESSAGE('Author', id), RECORD_NOT_FOUND_CODE);
  }

  return transformAuthorResponse(item) as AuthorResponse;
};
