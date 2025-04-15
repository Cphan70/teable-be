import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthConfig, authConfig } from '../../../configs/auth.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(@AuthConfig() readonly config: ConfigType<typeof authConfig>) {
    const { clientId, clientSecret, callbackUrl } = config.github;
    super({
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackUrl,
      scope: ['user:email'],
    });
  }

  validate(_accessToken: string, _refreshToken: string, profile: any): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    console.log({ profile });
    return 'http://localhost:3000/';
  }
}
