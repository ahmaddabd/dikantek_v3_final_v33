import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class WhatsAppService {
  private client;

  constructor() {
    this.client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  }

  async sendWhatsAppMessage(to: string, message: string) {
    await this.client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
    });
  }
}
