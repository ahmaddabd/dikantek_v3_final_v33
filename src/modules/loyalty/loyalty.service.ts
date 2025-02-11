import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyPoints } from './loyalty.entity';

@Injectable()
export class LoyaltyService {
  constructor(
    @InjectRepository(LoyaltyPoints)
    private loyaltyRepository: Repository<LoyaltyPoints>,
  ) {}

  async addPoints(userId: number, points: number) {
    let userPoints = await this.loyaltyRepository.findOne({ where: { userId } });
    if (!userPoints) {
      userPoints = this.loyaltyRepository.create({ userId, points });
    } else {
      userPoints.points += points;
    }
    return this.loyaltyRepository.save(userPoints);
  }

  async getPoints(userId: number) {
    return this.loyaltyRepository.findOne({ where: { userId } }) || { userId, points: 0 };
  }

  async redeemPoints(userId: number, pointsToRedeem: number) {
    const userPoints = await this.loyaltyRepository.findOne({ where: { userId } });
    if (!userPoints || userPoints.points < pointsToRedeem) {
      throw new Error('Insufficient points');
    }
    userPoints.points -= pointsToRedeem;
    return this.loyaltyRepository.save(userPoints);
  }
}
