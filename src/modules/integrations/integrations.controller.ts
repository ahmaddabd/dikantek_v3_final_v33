import { Controller, Post, Body } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post('webhook')
  async sendWebhook(@Body() body: { url: string, data: any }) {
    return this.integrationsService.sendWebhook(body.url, body.data);
  }

  @Post('analytics/google')
  async fetchGoogleAnalyticsData(@Body() body: { viewId: string, accessToken: string }) {
    return this.integrationsService.fetchGoogleAnalyticsData(body.viewId, body.accessToken);
  }

  @Post('crm/connect')
  async connectCRM(@Body() body: { crmApiUrl: string, apiKey: string, customerData: any }) {
    return this.integrationsService.connectCRM(body.crmApiUrl, body.apiKey, body.customerData);
  }
}