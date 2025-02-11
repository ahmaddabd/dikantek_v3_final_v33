import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Store } from '../stores/store.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async createProduct(name: string, description: string, price: number, storeId: number): Promise<Product> {
    const store = await this.storesRepository.findOne({ where: { id: storeId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${storeId} not found.`);
    }

    const product = this.productsRepository.create({
      name,
      description,
      price,
      store,
      approvalStatus: 'pending', // جميع المنتجات تبدأ بحالة "بانتظار الموافقة"
    });
    return this.productsRepository.save(product);
  }

  async approveProduct(productId: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    product.approvalStatus = 'approved';
    return this.productsRepository.save(product);
  }
}
