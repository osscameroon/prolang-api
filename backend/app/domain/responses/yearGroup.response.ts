import { YearGroupDocument } from '../../shared/types/models';
import { YearGroupResponse } from '../../shared/types/responses';
import { transformResponse } from './response';

const generateYearGroupResponse = (item: YearGroupDocument): YearGroupResponse => {
  return {
    id: item._id,
    name: item.name,
    position: item.position,
  };
};

export const transformYearGroupResponse = (data: YearGroupDocument | YearGroupDocument[]) => {
  return transformResponse<YearGroupDocument, YearGroupResponse>(data, generateYearGroupResponse);
};
