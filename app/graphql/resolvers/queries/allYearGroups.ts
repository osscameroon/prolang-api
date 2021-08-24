import { QueryResolvers } from '../../types/types';
import yearGroupService from '../../../domain/services/yearGroup.service';
import { transformYearGroupResponse } from '../../../domain/responses/yearGroup.response';
import { YearGroupResponse } from '../../../shared/types/responses';

export const allYearGroups: QueryResolvers['allYearGroups'] = async () => {
  const result = await yearGroupService.findAll();

  return transformYearGroupResponse(result) as YearGroupResponse[];
};
