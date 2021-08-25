import { Request } from 'express';
import { RequestTypeEnum } from '../types/models';

const parseQueryFields = (fields?: string) => {
  if (!fields) {
    return;
  }

  return fields
    .split(',')
    .map((field) => field.trim())
    .join(' ');
};

export const extractQueryFields = (query: Request['query']) => {
  return {
    fields: parseQueryFields(query.fields as string | undefined),
    keyword: query.search as string | undefined,
    page: parseInt((query.page as string | undefined) || '1'),
  };
};

export const selectRequestType = (requestUrl: string) => {
  if (requestUrl.startsWith('/graphql')) {
    return RequestTypeEnum.graphql;
  }

  if (requestUrl.startsWith('/api')) {
    return RequestTypeEnum.rest;
  }

  return RequestTypeEnum.common;
};
