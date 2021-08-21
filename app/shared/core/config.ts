import dotenv from 'dotenv';
import { EnvironmentName } from '../types/common';

const getEnvironmentFile = () => {
  const envName = (process.env.NODE_ENV || 'development') as EnvironmentName;

  const environmentMap: Record<EnvironmentName, string> = {
    production: '.env.prod',
    test: '.env.test',
    development: '.env',
  };

  return environmentMap[envName] || '.env';
};

dotenv.config({ path: getEnvironmentFile() });

const e = process.env;

export const ENV = e.NODE_ENV || 'development';
export const SERVER_PORT = parseInt(e.SERVER_PORT || '5700', 10);
export const BASE_URL = e.BASE_URL || '';
export const PAGINATION_LIMIT = e.PAGINATION_LIMIT || 20;
export const DATABASE_URL = e.DATABASE_URL || '';
