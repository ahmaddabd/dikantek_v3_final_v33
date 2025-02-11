import { Controller, Get, Body, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('metrics')
  generateMetrics(@Body() body: { salesData: any[], userActivity: any[] }) {
    return this.dashboardService.generateDashboardMetrics(body.salesData, body.userActivity);
  }
}