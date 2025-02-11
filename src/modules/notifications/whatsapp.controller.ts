import { Controller, Post, Body } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post('send')
  async sendWhatsAppMessage(@Body() body: { to: string; message: string }) {
    await this.whatsappService.sendWhatsAppMessage(body.to, body.message);
    return { message: 'WhatsApp message sent successfully' };
  }
}
