import { Controller, Get, Body, Post } from '@nestjs/common';
import { AIInsightsService } from './ai_insights.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly aiInsightsService: AIInsightsService) {}

  @Post('analyze')
  analyzeSales(@Body() salesData: any[]) {
    return this.aiInsightsService.analyzeSalesData(salesData);
  }
}