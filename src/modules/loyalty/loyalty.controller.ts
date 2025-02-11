import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';

@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Post('add')
  async addPoints(@Body() body: { userId: number; points: number }) {
    return this.loyaltyService.addPoints(body.userId, body.points);
  }

  @Get(':userId')
  async getPoints(@Param('userId') userId: number) {
    return this.loyaltyService.getPoints(Number(userId));
  }

  @Post('redeem')
  async redeemPoints(@Body() body: { userId: number; pointsToRedeem: number }) {
    return this.loyaltyService.redeemPoints(body.userId, body.pointsToRedeem);
  }
}
