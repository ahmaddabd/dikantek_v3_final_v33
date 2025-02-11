import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlashSale } from './flash_sale.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class FlashSalesService {
  constructor(
    @InjectRepository(FlashSale)
    private flashSalesRepository: Repository<FlashSale>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createFlashSale(productId: number, discountPercentage: number, startTime: Date, endTime: Date): Promise<FlashSale> {
    const product = await this.productsRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    const flashSale = this.flashSalesRepository.create({
      product,
      discountPercentage,
      startTime,
      endTime,
    });

    return this.flashSalesRepository.save(flashSale);
  }

  async getActiveFlashSales(): Promise<FlashSale[]> {
    const now = new Date();
    return this.flashSalesRepository.find({
      where: {
        startTime: { $lte: now },
        endTime: { $gte: now },
      },
      relations: ['product'],
    });
  }
}
