import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesReport } from './analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(SalesReport)
    private analyticsRepository: Repository<SalesReport>,
  ) {}

  async generateReport(storeId: number, revenue: number, orders: number, customers: number): Promise<SalesReport> {
    const report = this.analyticsRepository.create({ store: { id: storeId }, totalRevenue: revenue, totalOrders: orders, totalCustomers: customers });
    return this.analyticsRepository.save(report);
  }

  async getReports(): Promise<SalesReport[]> {
    return this.analyticsRepository.find({ relations: ['store'] });
  }

  async getReportByStore(storeId: number): Promise<SalesReport[]> {
    return this.analyticsRepository.find({ where: { store: { id: storeId } } });
  }
}