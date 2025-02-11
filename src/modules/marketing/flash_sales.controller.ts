import { Controller, Post, Get, Body, Param, UseGuards, SetMetadata } from '@nestjs/common';
import { FlashSalesService } from './flash_sales.service';
import { RolesGuard } from '../auth/roles/roles.guard';

@Controller('flash-sales')
export class FlashSalesController {
  constructor(private readonly flashSalesService: FlashSalesService) {}

  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['Admin', 'Store Owner'])
  @Post()
  async createFlashSale(
    @Body() body: { productId: number; discountPercentage: number; startTime: Date; endTime: Date },
  ) {
    return this.flashSalesService.createFlashSale(body.productId, body.discountPercentage, body.startTime, body.endTime);
  }

  @Get('active')
  async getActiveFlashSales() {
    return this.flashSalesService.getActiveFlashSales();
  }
}
