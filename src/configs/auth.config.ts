import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

export const authConfig = registerAs('auth', () => ({
  github: {
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackUrl: process.env.GITHUB_CALLBACK_URL || '',
  },
  accessToken: {
    secret: process.env.ACCESS_TOKEN_SECRET || '',
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '',
  },
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET || '',
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '',
  },
}));

export const AuthConfig = () => Inject(authConfig.KEY);

export type IAuthConfig = ConfigType<typeof authConfig>;
