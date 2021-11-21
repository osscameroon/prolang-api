import { Request } from 'express';
import { RequestTypeEnum } from '../types/models';
import { PRIVATE_ROUTE_PREFIX, PUBLIC_ROUTE_PREFIX } from './constants';
import { Undefined } from '../types/common';

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
  const page = parseInt((query.page as Undefined<string>) || '1');

  return {
    fields: parseQueryFields(query.fields as Undefined<string>),
    keyword: query.search as Undefined<string>,
    page: page || 1,
    yearGroupName: query.yearGroup as Undefined<string>,
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
  const privatePath = endpoint === '/' ? '' : `/${endpoint}`;

  const publicPrefix = `${PUBLIC_ROUTE_PREFIX}${endpoint === '/' ? '' : endpoint}`;
  const privatePrefix = `${PRIVATE_ROUTE_PREFIX}${privatePath}`;

  return [publicPrefix, privatePrefix];
};
