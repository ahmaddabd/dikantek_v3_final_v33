import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyPoints } from './loyalty.entity';
import { Wishlist } from './wishlist.entity';
import { SupportTicket, TicketStatus } from './support.entity';

@Injectable()
export class EngagementService {
  constructor(
    @InjectRepository(LoyaltyPoints) private loyaltyRepository: Repository<LoyaltyPoints>,
    @InjectRepository(Wishlist) private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(SupportTicket) private supportRepository: Repository<SupportTicket>,
  ) {}

  async addLoyaltyPoints(userId: number, points: number): Promise<LoyaltyPoints> {
    const loyalty = this.loyaltyRepository.create({ user: { id: userId }, points });
    return this.loyaltyRepository.save(loyalty);
  }

  async addToWishlist(userId: number, productId: number): Promise<Wishlist> {
    const wishlistItem = this.wishlistRepository.create({ user: { id: userId }, product: { id: productId } });
    return this.wishlistRepository.save(wishlistItem);
  }

  async createSupportTicket(userId: number, subject: string, message: string): Promise<SupportTicket> {
    const ticket = this.supportRepository.create({ user: { id: userId }, subject, message, status: TicketStatus.OPEN });
    return this.supportRepository.save(ticket);
  }
}