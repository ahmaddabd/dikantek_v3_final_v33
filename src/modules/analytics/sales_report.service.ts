import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/order.entity';

@Injectable()
export class SalesReportService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async getSalesReport(timeFrame: string): Promise<any> {
    let query = this.ordersRepository.createQueryBuilder('order')
      .select('DATE(order.createdAt) as date, COUNT(order.id) as totalOrders, SUM(order.totalPrice) as totalRevenue')
      .groupBy('DATE(order.createdAt)');

    if (timeFrame === 'weekly') {
      query = query.where("order.createdAt >= NOW() - INTERVAL '7 days'");
    } else if (timeFrame === 'monthly') {
      query = query.where("order.createdAt >= NOW() - INTERVAL '30 days'");
    }

    return query.getRawMany();
  }
}


  async getCachedSalesReport(timeFrame: string): Promise<any> {
    const cacheKey = `sales-report-${timeFrame}`;
    const cachedData = await this.cacheService.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const report = await this.getSalesReport(timeFrame);
    await this.cacheService.set(cacheKey, report, 3600); // تخزين لمدة ساعة

    return report;
  }
