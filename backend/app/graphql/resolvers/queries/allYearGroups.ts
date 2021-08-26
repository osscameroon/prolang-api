import { QueryResolvers } from '../../types/types';
import yearGroupService from '../../../domain/services/yearGroup.service';

export const allYearGroups: QueryResolvers['allYearGroups'] = async () => {
  return yearGroupService.findAll();
};
