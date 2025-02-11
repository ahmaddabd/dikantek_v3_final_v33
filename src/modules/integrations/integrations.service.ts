import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class IntegrationsService {
  constructor(private readonly httpService: HttpService) {}

  async sendWebhook(url: string, data: any): Promise<any> {
    return this.httpService.post(url, data).toPromise();
  }

  async fetchGoogleAnalyticsData(viewId: string, accessToken: string): Promise<any> {
    const url = `https://analytics.googleapis.com/v4/reports?viewId=${viewId}`;
    return this.httpService.get(url, { headers: { Authorization: `Bearer ${accessToken}` } }).toPromise();
  }

  async connectCRM(crmApiUrl: string, apiKey: string, customerData: any): Promise<any> {
    return this.httpService.post(`${crmApiUrl}/customers`, customerData, { headers: { Authorization: `Bearer ${apiKey}` } }).toPromise();
  }
}