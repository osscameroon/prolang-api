import dotenv from 'dotenv';
import { EnvironmentName } from '../types/common';

const getEnvironmentFile = () => {
  const envName = (process.env.NODE_ENV || 'development') as EnvironmentName;

  const environmentMap: Record<EnvironmentName, string> = {
    development: '.env',
    production: '.env.prod',
    test: '.env.test',
  };

  return environmentMap[envName] || '.env';
};

dotenv.config({ path: getEnvironmentFile() });

const e = process.env;

export const ENV = e.NODE_ENV || 'development';
export const SERVER_PORT = parseInt(e.SERVER_PORT || '5700', 10);
export const BASE_URL = e.BASE_URL || '';
export const PAGINATION_LIMIT = parseInt(e.PAGINATION_LIMIT || '20', 10);
export const DATABASE_URL = e.DATABASE_URL || '';
export const MAX_REQUEST_LIMIT = parseInt(e.MAX_REQUEST_LIMIT || '100', 10);
export const MAX_REQUEST_WINDOW = parseInt(e.MAX_REQUEST_WINDOW || '900', 10);
export const SENTRY_ENABLED = e.SENTRY_ENABLED === 'true';
export const SENTRY_DSN = e.SENTRY_DSN || '';
export const JWT_SECRET = e.JWT_SECRET || '';
export const JWT_EXPIRE = parseInt(e.JWT_EXPIRE || '86400', 10);
export const AUTH_ENABLED = e.AUTH_ENABLED === 'true';
export const ADMIN_PASSWORD = e.ADMIN_PASSWORD || '';
export const CLIENT_ORIGIN = e.CLIENT_ORIGIN || '';
