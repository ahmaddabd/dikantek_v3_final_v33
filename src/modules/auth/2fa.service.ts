import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Injectable()
export class TwoFactorAuthService {
  generateSecret(userEmail: string) {
    const secret = speakeasy.generateSecret({ name: `Dikantek (${userEmail})` });
    return { secret: secret.base32, qrCode: secret.otpauth_url };
  }

  async generateQRCode(otpauthUrl: string) {
    return await qrcode.toDataURL(otpauthUrl);
  }

  verifyToken(secret: string, token: string) {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1
    });
  }
}