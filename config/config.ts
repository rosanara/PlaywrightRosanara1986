import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  url: process.env.SAUCE_DEMO_URL || 'https://www.saucedemo.com',
  validUsername: process.env.VALID_USERNAME || 'standard_user',
  validPassword: process.env.VALID_PASSWORD || 'secret_sauce',
  invalidUsername: process.env.INVALID_USERNAME || 'invalid_user',
  invalidPassword: process.env.INVALID_PASSWORD || 'wrong_password',
};
