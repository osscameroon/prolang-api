import { Request } from 'express';
import { RequestTypeEnum } from '../types/models';
import { PRIVATE_ROUTE_PREFIX, PUBLIC_ROUTE_PREFIX } from './constants';

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
  const page = parseInt((query.page as string | undefined) || '1');

  return {
    fields: parseQueryFields(query.fields as string | undefined),
    keyword: query.search as string | undefined,
    name: query.name as string | undefined,
    page: page || 1,
  };
};

export const selectRequestType = (requestUrl: string) => {
  if (requestUrl.startsWith('/api')) {
    return RequestTypeEnum.rest;
  }

  return RequestTypeEnum.common;
};

export const removeQueryStringIfExist = (route: string) => {
  if (route.indexOf('?') >= 0) {
    const routeSplit = route.split('?');

    return routeSplit.length > 0 ? routeSplit[0] : '';
  }

  return route;
};

export const generateRoutePrefix = (endpoint: string) => {
  const publicPrefix = `${PUBLIC_ROUTE_PREFIX}/${endpoint}`;
  const privatePrefix = `${PRIVATE_ROUTE_PREFIX}/${endpoint}`;

  return [publicPrefix, privatePrefix];
};
