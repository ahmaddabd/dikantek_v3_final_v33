import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('email')
  async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
    await this.notificationsService.sendEmail(body.to, body.subject, body.text);
    return { message: 'Email sent successfully' };
  }

  @Post('sms')
  async sendSMS(@Body() body: { to: string; message: string }) {
    await this.notificationsService.sendSMS(body.to, body.message);
    return { message: 'SMS sent successfully' };
  }
}
