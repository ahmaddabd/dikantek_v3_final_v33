import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class AIInsightsService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getTopSellingProducts(): Promise<any> {
    return this.ordersRepository.createQueryBuilder('order')
      .select('order.productId, COUNT(order.id) as totalSales')
      .groupBy('order.productId')
      .orderBy('totalSales', 'DESC')
      .limit(5)
      .getRawMany();
  }

  async getCustomerSegments(): Promise<any> {
    return this.ordersRepository.createQueryBuilder('order')
      .select('order.customerId, COUNT(order.id) as totalPurchases')
      .groupBy('order.customerId')
      .orderBy('totalPurchases', 'DESC')
      .getRawMany();
  }
}
