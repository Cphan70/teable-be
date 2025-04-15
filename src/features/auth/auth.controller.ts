import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('signup')
  register() {
    return this.service.login();
  }

  @Post('signin')
  login() {
    return this.service.login();
  }

  @Post('logout')
  logout() {
    return this.service.login();
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    // Redirect to GitHub
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubCallback(@Req() req: Request, @Res() res: Response) {
    console.log({ user: req?.user });

    return res.redirect(req?.user as string);
  }
}
