import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  generateDashboardMetrics(salesData: any[], userActivity: any[]): any {
    return {
      totalSales: salesData.length,
      activeUsers: userActivity.filter(activity => activity.type === 'login').length,
      recentTransactions: salesData.slice(-5),
    };
  }
}