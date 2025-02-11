import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth2FAService } from './auth2fa.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly auth2FAService: Auth2FAService,
  ) {}

  @Post('enable-2fa')
  async enable2FA(@Body() body: { userId: number }) {
    return this.auth2FAService.generateSecret(body.userId);
  }

  @Post('verify-2fa')
  async verify2FA(@Body() body: { secret: string; token: string }) {
    return this.auth2FAService.verifyToken(body.secret, body.token);
  }
}
