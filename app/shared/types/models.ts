import { Document } from 'mongoose';

export type YearGroupDocument = Document & {
  name: string;
};

export type CreateYearGroupInput = {
  name: YearGroupDocument['name'];
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
  authors: AuthorDocument[];
  company: string | null;
  link: string | null;
  listed: boolean;
  name: string;
  nameExtra: {
    link: string | null;
    name: string;
  } | null;
  predecessors: LanguageDocument[];
  yearConfirmed: boolean;
  yearGroup: YearGroupDocument;
  years: number[];
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
  graphql = 'graphql',
  rest = 'rest',
}

export type RequestLogDocument = Document & {
  endpoint: string;
  ipAddress: string;
  succeed: boolean;
  type: RequestTypeEnum;
};

export type CreateRequestLogInput = {
  endpoint: RequestLogDocument['endpoint'];
  ipAddress: RequestLogDocument['ipAddress'];
  succeed: RequestLogDocument['succeed'];
  type: RequestLogDocument['type'];
};
