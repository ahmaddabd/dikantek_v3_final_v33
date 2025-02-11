import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailMarketingService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendMarketingEmail(recipient: string, subject: string, content: string) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject,
      text: content,
    });
  }
}