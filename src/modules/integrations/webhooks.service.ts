import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebhooksService {
  async sendWebhook(url: string, event: string, data: any) {
    try {
      await axios.post(url, { event, data });
    } catch (error) {
      console.error(`Failed to send webhook to ${url}`, error);
    }
  }
}
