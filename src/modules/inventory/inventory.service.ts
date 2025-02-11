import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductStock } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(ProductStock)
    private inventoryRepository: Repository<ProductStock>,
  ) {}

  async updateStock(productId: number, quantity: number): Promise<ProductStock> {
    let stock = await this.inventoryRepository.findOne({ where: { product: { id: productId } } });
    if (!stock) throw new NotFoundException('Product stock not found');

    stock.quantity = quantity;
    return this.inventoryRepository.save(stock);
  }

  async getStock(productId: number): Promise<ProductStock> {
    const stock = await this.inventoryRepository.findOne({ where: { product: { id: productId } } });
    if (!stock) throw new NotFoundException('Product stock not found');
    return stock;
  }
}