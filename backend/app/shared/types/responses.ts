import { YearGroupDocument, AuthorDocument, LanguageDocument, UserDocument } from './models';

export type HttpResponseData<T> = {
  data: T;
};

export type YearGroupResponse = {
  id: YearGroupDocument['_id'];
  name: YearGroupDocument['name'];
  position: YearGroupDocument['position'];
};

export type YearGroupEnhancedResponse = {
  id: YearGroupDocument['_id'];
  languageCount: number;
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
  longName: LanguageDocument['longName'];
  name: LanguageDocument['name'];
  nameExtra: LanguageDocument['nameExtra'];
  predecessors?: LanguageResponse[];
  yearConfirmed: LanguageDocument['yearConfirmed'];
  yearGroup?: YearGroupResponse;
  years: LanguageDocument['years'];
};

export type UserResponse = {
  email: UserDocument['email'];
  id: UserDocument['_id'];
  name: UserDocument['name'];
  role: UserDocument['role'];
};
