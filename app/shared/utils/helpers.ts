import { Request } from 'express';

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
