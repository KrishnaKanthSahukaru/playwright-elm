import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface EnvironmentConfig {
  baseUrl: string;
  apiUrl: string;
  apiKey?: string;
  apiMode: 'mock' | 'real';
  adminUser?: string;
  adminPass?: string;
  headless: boolean;
}

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`CONFIGURATION ERROR: Missing variable [${key}] in .env file.`);
  }
  return value;
};

export const Config: EnvironmentConfig = {
  baseUrl: getEnvVariable('BASE_URL'),
  apiUrl: (process.env.API_MODE ?? 'mock') === 'mock'
    ? 'http://127.0.0.1:3100'
    : (getEnvVariable('API_URL').endsWith('/api') ? getEnvVariable('API_URL') : `${getEnvVariable('API_URL')}/api`),
  apiKey: process.env.API_KEY,
  apiMode: process.env.API_MODE === 'real' ? 'real' : 'mock',
  adminUser: process.env.ADMIN_USERNAME,
  adminPass: process.env.ADMIN_PASSWORD,
  headless: process.env.HEADLESS !== 'false',
};
