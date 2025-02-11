import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateStock(@Body() body: { productId: number, quantity: number }) {
    return this.inventoryService.updateStock(body.productId, body.quantity);
  }

  @Get(':productId')
  async getStock(@Param('productId') productId: number) {
    return this.inventoryService.getStock(productId);
  }
}