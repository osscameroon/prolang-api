import { Document } from 'mongoose';

export type YearGroupDocument = Document & {
  name: string;
};

export type CreateYearGroupInput = {
  name: YearGroupDocument['name'];
};

export type AuthorDocument = Document & {
  name: string;
  birthDate: Date | null;
  country: string | null;
  link: string | null;
  picture: string | null;
};

export type CreateAuthorInput = {
  name: AuthorDocument['name'];
  birthDate: AuthorDocument['birthDate'];
  country: AuthorDocument['country'];
  link: AuthorDocument['link'];
  picture: AuthorDocument['picture'];
};

export type LanguageDocument = Document & {
  name: string;
  nameExtra: {
    name: string;
    link: string | null;
  } | null;
  years: number[];
  company: string | null;
  link: string | null;
  yearConfirmed: boolean;
  yearGroup: YearGroupDocument;
  authors: AuthorDocument[];
  predecessors: LanguageDocument[];
  listed: boolean;
};

export type CreateLanguageInput = {
  name: LanguageDocument['name'];
  nameExtra: LanguageDocument['nameExtra'];
  years: LanguageDocument['years'];
  company: LanguageDocument['company'];
  link: LanguageDocument['link'];
  yearConfirmed: LanguageDocument['yearConfirmed'];
  yearGroup: string;
  authors: string[];
  predecessors: string[];
  listed: LanguageDocument['listed'];
};

export enum RequestTypeEnum {
  rest = 'rest',
  graphql = 'graphql',
}

export type RequestLogDocument = Document & {
  type: RequestTypeEnum;
  endpoint: string;
  ipAddress: string;
  succeed: boolean;
};

export type CreateRequestLogInput = {
  type: RequestLogDocument['type'];
  endpoint: RequestLogDocument['endpoint'];
  ipAddress: RequestLogDocument['ipAddress'];
  succeed: RequestLogDocument['succeed'];
};
