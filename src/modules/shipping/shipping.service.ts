import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingService {
  private shippingRates = {
    local: 10, // سعر الشحن المحلي
    international: 25, // سعر الشحن الدولي
  };

  calculateShipping(destination: string, weight: number): number {
    const baseRate = destination === 'local' ? this.shippingRates.local : this.shippingRates.international;
    return baseRate + weight * 2; // رسوم إضافية بناءً على الوزن
  }
}
