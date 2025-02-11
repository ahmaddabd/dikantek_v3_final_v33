import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('generate')
  async generateReport(@Body() body: { storeId: number, revenue: number, orders: number, customers: number }) {
    return this.analyticsService.generateReport(body.storeId, body.revenue, body.orders, body.customers);
  }

  @Get()
  async getReports() {
    return this.analyticsService.getReports();
  }

  @Get(':storeId')
  async getReportByStore(@Param('storeId') storeId: number) {
    return this.analyticsService.getReportByStore(storeId);
  }
}