import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './coupon.entity';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private couponsRepository: Repository<Coupon>,
  ) {}

  async createCoupon(code: string, discountValue: number, discountType: string, maxUsage: number, expiryDate: Date): Promise<Coupon> {
    const coupon = this.couponsRepository.create({
      code,
      discountValue,
      discountType,
      maxUsage,
      expiryDate,
    });

    return this.couponsRepository.save(coupon);
  }

  async applyCoupon(code: string): Promise<Coupon> {
    const coupon = await this.couponsRepository.findOne({ where: { code } });
    if (!coupon) {
      throw new NotFoundException('Coupon not found or expired.');
    }

    if (coupon.usedCount >= coupon.maxUsage || new Date() > new Date(coupon.expiryDate)) {
      throw new NotFoundException('Coupon expired or reached max usage limit.');
    }

    coupon.usedCount += 1;
    return this.couponsRepository.save(coupon);
  }
}
