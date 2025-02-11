import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SubscriptionPlan } from './subscription.entity';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSubscription(@Request() req, @Body() body: { storeId: number, plan: SubscriptionPlan, paymentId: number }) {
    return this.subscriptionsService.createSubscription(req.user.userId, body.storeId, body.plan, body.paymentId);
  }

  @Get()
  async getSubscriptions() {
    return this.subscriptionsService.getSubscriptions();
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/upgrade')
  async upgradeSubscription(@Param('id') id: number, @Body() body: { newPlan: SubscriptionPlan }) {
    return this.subscriptionsService.upgradeSubscription(id, body.newPlan);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/cancel')
  async cancelSubscription(@Param('id') id: number) {
    return this.subscriptionsService.cancelSubscription(id);
  }
}