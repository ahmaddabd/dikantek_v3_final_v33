import { Controller, Get, Query } from '@nestjs/common';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get('calculate')
  async calculateShipping(@Query('destination') destination: string, @Query('weight') weight: number) {
    const cost = this.shippingService.calculateShipping(destination, Number(weight));
    return { destination, weight, cost };
  }
}
