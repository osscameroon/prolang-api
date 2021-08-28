import { LanguagePopulatedDocument } from '../../shared/types/models';
import { AuthorResponse, LanguageResponse, YearGroupResponse } from '../../shared/types/responses';
import { transformResponse } from './response';
import { transformYearGroupResponse } from './yearGroup.response';
import { transformAuthorResponse } from './author.response';

const generateLanguageResponse = (item: LanguagePopulatedDocument): LanguageResponse => {
  return {
    authors: !item.authors ? undefined : (transformAuthorResponse(item.authors) as AuthorResponse[]),
    company: item.company,
    id: item._id,
    link: item.link,
    longName: item.longName,
    name: item.name,
    nameExtra: item.nameExtra,
    predecessors: !item.predecessors ? undefined : item.predecessors.map(generateLanguageResponse),
    yearConfirmed: item.yearConfirmed,
    yearGroup: !item.yearGroup ? undefined : (transformYearGroupResponse(item.yearGroup) as YearGroupResponse),
    years: item.years,
  };
};

export const transformLanguageResponse = (data: LanguagePopulatedDocument | LanguagePopulatedDocument[]) => {
  return transformResponse<LanguagePopulatedDocument, LanguageResponse>(data, generateLanguageResponse);
};
