import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Injectable()
export class Auth2FAService {
  async generateSecret(userId: number): Promise<{ secret: string; qrCode: string }> {
    const secret = speakeasy.generateSecret({ name: `Dikantek-${userId}` });
    const qrCode = await qrcode.toDataURL(secret.otpauth_url);
    
    return { secret: secret.base32, qrCode };
  }

  async verifyToken(secret: string, token: string): Promise<boolean> {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });
  }
}
