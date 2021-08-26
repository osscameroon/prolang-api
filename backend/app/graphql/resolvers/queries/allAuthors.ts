import { QueryResolvers } from '../../types/types';
import authorService from '../../../domain/services/author.service';

export const allAuthors: QueryResolvers['allAuthors'] = async () => {
  return authorService.findAll();
};
