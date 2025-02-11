import { Controller, Post, Body, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { RolesGuard } from '../auth/roles/roles.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(':storeId')
  async createProduct(
    @Body() body: { name: string; description: string; price: number },
    @Param('storeId') storeId: number,
  ) {
    return this.productsService.createProduct(body.name, body.description, body.price, storeId);
  }

  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['Admin'])
  @Patch(':productId/approve')
  async approveProduct(@Param('productId') productId: number) {
    return this.productsService.approveProduct(productId);
  }
}
