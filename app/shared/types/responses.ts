import { YearGroupDocument, AuthorDocument, LanguageDocument } from './models';

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

export type LanguageResponse = {
  authors?: AuthorResponse[];
  company: LanguageDocument['company'];
  id: LanguageDocument['_id'];
  link: LanguageDocument['link'];
  listed: LanguageDocument['listed'];
  name: LanguageDocument['name'];
  nameExtra: LanguageDocument['nameExtra'];
  predecessors?: LanguageResponse[];
  yearConfirmed: LanguageDocument['yearConfirmed'];
  yearGroup?: YearGroupResponse;
  years: LanguageDocument['years'];
};
