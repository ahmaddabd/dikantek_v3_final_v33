import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['user', 'products'] });
  }

  async getOrderById(id: number): Promise<Order> {
    return this.ordersRepository.findOne({ where: { id }, relations: ['user', 'products'] });
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const order = await this.getOrderById(id);
    if (order) {
      order.status = status;
      return this.ordersRepository.save(order);
    }
    throw new Error('Order not found');
  }
}
