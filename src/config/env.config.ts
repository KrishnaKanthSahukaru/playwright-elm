import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface EnvironmentConfig {
  baseUrl: string;
  apiUrl: string;
  adminUser: string;
  adminPass: string;
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
  // Architectural Guard: Ensure the API path explicitly includes the subpath structure securely
  apiUrl: getEnvVariable('API_URL').endsWith('/api') ? getEnvVariable('API_URL') : `${getEnvVariable('API_URL')}/api`,
  adminUser: getEnvVariable('ADMIN_USERNAME'),
  adminPass: getEnvVariable('ADMIN_PASSWORD'),
  headless: getEnvVariable('HEADLESS') === 'true',
};
