import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { EngagementService } from './engagement.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('engagement')
export class EngagementController {
  constructor(private readonly engagementService: EngagementService) {}

  @UseGuards(JwtAuthGuard)
  @Post('loyalty')
  async addLoyaltyPoints(@Request() req, @Body() body: { points: number }) {
    return this.engagementService.addLoyaltyPoints(req.user.userId, body.points);
  }

  @UseGuards(JwtAuthGuard)
  @Post('wishlist')
  async addToWishlist(@Request() req, @Body() body: { productId: number }) {
    return this.engagementService.addToWishlist(req.user.userId, body.productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('support')
  async createSupportTicket(@Request() req, @Body() body: { subject: string, message: string }) {
    return this.engagementService.createSupportTicket(req.user.userId, body.subject, body.message);
  }
}