import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { authConfig, AuthConfig } from '../../configs/auth.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @AuthConfig() readonly config: ConfigType<typeof authConfig>,
    private readonly jwtService: JwtService,
  ) {}
  async login() {
    const accessToken = await this.jwtService.signAsync(
      {
        UserId: '123456',
        Provider: 'local',
      },
      {
        secret: this.config.accessToken.secret,
        expiresIn: this.config.accessToken.expiresIn,
      },
    );

    console.log({ accessToken });
    throw new BadRequestException('INVALID');
    // console.log({ accessToken });
    // return successResponse<string>({
    //   data: '',
    //   message: '',
    // });
  }
}
