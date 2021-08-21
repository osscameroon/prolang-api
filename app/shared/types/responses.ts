import { YearGroupDocument } from './models';

export type YearGroupResponse = {
  id: YearGroupDocument['_id'];
  name: YearGroupDocument['name'];
  position: YearGroupDocument['position'];
};
