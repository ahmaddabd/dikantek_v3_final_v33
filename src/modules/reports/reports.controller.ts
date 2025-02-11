import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('log')
  async logActivity(@Body() body: { userId: number, action: string, metadata: string }) {
    return this.reportsService.logActivity(body.userId, body.action, body.metadata);
  }

  @Get('user/:userId')
  async getUserActivity(@Param('userId') userId: number) {
    return this.reportsService.getUserActivity(userId);
  }

  @Get('summary')
  async generateReport() {
    return this.reportsService.generateReport();
  }
}