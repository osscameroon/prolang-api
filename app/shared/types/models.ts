import { Document } from 'mongoose';

export type YearGroupDocument = Document & {
  name: string;
  position: number;
};

export type CreateYearGroupInput = {
  name: YearGroupDocument['name'];
  position: YearGroupDocument['position'];
};

export type AuthorDocument = Document & {
  birthDate: Date | null;
  country: string | null;
  link: string | null;
  name: string;
  picture: string | null;
};

export type CreateAuthorInput = {
  birthDate: AuthorDocument['birthDate'];
  country: AuthorDocument['country'];
  link: AuthorDocument['link'];
  name: AuthorDocument['name'];
  picture: AuthorDocument['picture'];
};

export type LanguageDocument = Document & {
  authors: string[];
  company: string | null;
  link: string | null;
  listed: boolean;
  name: string;
  nameExtra: {
    link: string | null;
    name: string | null;
  };
  predecessors: string[];
  yearConfirmed: boolean;
  yearGroup: string;
  years: number[];
};

export type LanguagePopulatedDocument = Omit<LanguageDocument, 'authors' | 'predecessors' | 'yearGroup'> & {
  authors: AuthorDocument[];
  predecessors: LanguagePopulatedDocument[];
  yearGroup: YearGroupDocument;
};

export type CreateLanguageInput = {
  authors: string[];
  company: LanguageDocument['company'];
  link: LanguageDocument['link'];
  listed: LanguageDocument['listed'];
  name: LanguageDocument['name'];
  nameExtra: LanguageDocument['nameExtra'];
  predecessors: string[];
  yearConfirmed: LanguageDocument['yearConfirmed'];
  yearGroup: string;
  years: LanguageDocument['years'];
};

export enum RequestTypeEnum {
  common = 'common',
  graphql = 'graphql',
  rest = 'rest',
}

export type RequestLogDocument = Document & {
  endpoint: string;
  ipAddress: string;
  type: RequestTypeEnum;
};

export type CreateRequestLogInput = {
  endpoint: RequestLogDocument['endpoint'];
  ipAddress: RequestLogDocument['ipAddress'];
  type: RequestLogDocument['type'];
};

export type PaginatedResult<T> = {
  currentPage: number;
  items: T[];
  limit: number;
  totalItems: number;
  totalPages: number;
};
