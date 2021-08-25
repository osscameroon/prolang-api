import { ApolloError } from 'apollo-server-express';

import { QueryResolvers } from '../../types/types';
import { LanguageDocument } from '../../../shared/types/models';
import languageService from '../../../domain/services/language.service';
import { RECORD_NOT_FOUND_CODE, RECORD_NOT_FOUND_MESSAGE } from '../../../shared/utils/constants';

export const oneLanguage: QueryResolvers['oneLanguage'] = async (_context, args) => {
  const { id } = args;

  const item: LanguageDocument = await languageService.findByIdOrName(id);

  if (!item) {
    throw new ApolloError(RECORD_NOT_FOUND_MESSAGE('Language', id), RECORD_NOT_FOUND_CODE);
  }

  return item;
};
