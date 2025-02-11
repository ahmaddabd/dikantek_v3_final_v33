import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private cacheService: CacheService,
  ) {}

  async searchProducts(keyword: string): Promise<Product[]> {
    const products = await this.productsRepository.createQueryBuilder('product')
      .where('product.name ILIKE :keyword', { keyword: `%${keyword}%` })
      .limit(50) // تطبيق Pagination
      .getMany();

    return this.cacheService.cacheProducts(products);
  }
}