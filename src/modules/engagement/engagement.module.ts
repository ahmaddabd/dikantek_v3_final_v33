import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngagementService } from './engagement.service';
import { EngagementController } from './engagement.controller';
import { LoyaltyPoints } from './loyalty.entity';
import { Wishlist } from './wishlist.entity';
import { SupportTicket } from './support.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoyaltyPoints, Wishlist, SupportTicket])],
  controllers: [EngagementController],
  providers: [EngagementService],
  exports: [EngagementService],
})
export class EngagementModule {}