import { Injectable } from '@nestjs/common';

@Injectable()
export class AIInsightsService {
  analyzeSalesData(salesData: any[]): any {
    const totalRevenue = salesData.reduce((sum, sale) => sum + sale.amount, 0);
    const avgOrderValue = totalRevenue / salesData.length;
    return {
      totalRevenue,
      avgOrderValue,
      topProducts: this.getTopProducts(salesData),
    };
  }

  private getTopProducts(salesData: any[]): any[] {
    const productSales = {};
    salesData.forEach(sale => {
      productSales[sale.productId] = (productSales[sale.productId] || 0) + sale.amount;
    });

    return Object.entries(productSales)
      .map(([productId, total]) => ({ productId, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }
}