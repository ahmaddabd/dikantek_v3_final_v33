import { Injectable } from '@nestjs/common';
import * as csvParser from 'csv-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import * as fs from 'fs';

@Injectable()
export class BulkUploadService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async uploadProducts(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const products = [];
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', async (row) => {
          const product = this.productRepository.create({
            name: row.name,
            description: row.description,
            price: row.price,
            stock: row.stock,
            category: row.category,
            imageUrl: row.imageUrl,
          });
          products.push(product);
        })
        .on('end', async () => {
          await this.productRepository.save(products);
          resolve({ message: 'Bulk upload completed successfully!', total: products.length });
        })
        .on('error', (error) => reject(error));
    });
  }
}
