import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

@Injectable()
export class OAuthService {
  private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  async verifyGoogleToken(token: string): Promise<any> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  }

  async verifyFacebookToken(token: string): Promise<any> {
    const response = await axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
    return response.data;
  }
}
