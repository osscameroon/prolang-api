import dotenv from 'dotenv';
import { EnvironmentName } from './types';

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
