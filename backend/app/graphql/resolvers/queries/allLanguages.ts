import { QueryResolvers } from '../../types/types';
import languageService from '../../../domain/services/language.service';

export const allLanguages: QueryResolvers['allLanguages'] = async () => {
  return languageService.findAll();
};
