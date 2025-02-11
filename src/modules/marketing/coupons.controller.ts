import { Controller, Post, Body, Get, Param, UseGuards, SetMetadata } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { RolesGuard } from '../auth/roles/roles.guard';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['Admin', 'Store Owner'])
  @Post()
  async createCoupon(
    @Body() body: { code: string; discountValue: number; discountType: string; maxUsage: number; expiryDate: Date },
  ) {
    return this.couponsService.createCoupon(body.code, body.discountValue, body.discountType, body.maxUsage, body.expiryDate);
  }

  @Post(':code/apply')
  async applyCoupon(@Param('code') code: string) {
    return this.couponsService.applyCoupon(code);
  }
}
