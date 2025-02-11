import { Controller, Get, Query } from '@nestjs/common';
import { SalesReportService } from './sales_report.service';

@Controller('analytics/sales-report')
export class SalesReportController {
  constructor(private readonly salesReportService: SalesReportService) {}

  @Get()
  async getSalesReport(@Query('timeFrame') timeFrame: string) {
    return this.salesReportService.getSalesReport(timeFrame || 'daily');
  }
}


  @Get('cached')
  async getCachedSalesReport(@Query('timeFrame') timeFrame: string) {
    return this.salesReportService.getCachedSalesReport(timeFrame || 'daily');
  }
