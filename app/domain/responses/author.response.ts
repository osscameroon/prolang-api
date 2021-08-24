import { AuthorDocument } from '../../shared/types/models';
import { AuthorResponse } from '../../shared/types/responses';
import { transformResponse } from './response';

const generateAuthorResponse = (item: AuthorDocument): AuthorResponse => {
  return {
    birthDate: item.birthDate ? new Date(item.birthDate) : null,
    country: item.country,
    id: item._id,
    link: item.link,
    name: item.name,
    picture: item.picture,
  };
};

export const transformAuthorResponse = (data: AuthorDocument | AuthorDocument[]) => {
  return transformResponse<AuthorDocument, AuthorResponse>(data, generateAuthorResponse);
};
