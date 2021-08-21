import { YearGroupDocument, AuthorDocument } from './models';

export type YearGroupResponse = {
  id: YearGroupDocument['_id'];
  name: YearGroupDocument['name'];
  position: YearGroupDocument['position'];
};

export type AuthorResponse = {
  birthDate: AuthorDocument['birthDate'];
  country: AuthorDocument['country'];
  id: AuthorDocument['_id'];
  link: AuthorDocument['link'];
  name: AuthorDocument['name'];
  picture: AuthorDocument['picture'];
};
