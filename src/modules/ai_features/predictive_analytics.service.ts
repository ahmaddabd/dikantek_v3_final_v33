import { Injectable } from '@nestjs/common';

@Injectable()
export class PredictiveAnalyticsService {
  predictSalesTrend(salesData: any[]): any {
    const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
    return {
      predictedGrowth: totalSales * 1.1, // توقع بسيط لنمو المبيعات بنسبة 10%
      highDemandProducts: salesData.slice(-3),
    };
  }
}