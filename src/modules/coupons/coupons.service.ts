import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './coupon.entity';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private couponsRepository: Repository<Coupon>,
  ) {}

  async createCoupon(code: string, discount: number, expiresAt: Date) {
    const coupon = this.couponsRepository.create({ code, discount, expiresAt });
    return this.couponsRepository.save(coupon);
  }

  async validateCoupon(code: string) {
    const coupon = await this.couponsRepository.findOne({ where: { code } });
    if (!coupon || new Date() > new Date(coupon.expiresAt)) {
      throw new Error('Invalid or expired coupon');
    }
    return coupon;
  }
}
