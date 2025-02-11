import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getStats() {
    const totalOrders = await this.ordersRepository.count();
    const totalProducts = await this.productsRepository.count();
    const totalUsers = await this.usersRepository.count();

    return { totalOrders, totalProducts, totalUsers };
  }
}