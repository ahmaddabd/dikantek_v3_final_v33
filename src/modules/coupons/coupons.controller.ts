import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CouponsService } from './coupons.service';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post('create')
  async createCoupon(@Body() body: { code: string; discount: number; expiryDate: string }) {
    return this.couponsService.createCoupon(body.code, body.discount, new Date(body.expiryDate));
  }

  @Get('validate/:code')
  async validateCoupon(@Param('code') code: string) {
    const coupon = await this.couponsService.validateCoupon(code);
    if (coupon) {
      return { valid: true, discount: coupon.discount };
    }
    return { valid: false, message: 'Coupon is invalid or expired' };
  }
}
