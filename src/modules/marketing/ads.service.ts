import { Injectable } from '@nestjs/common';

@Injectable()
export class AdsService {
  private ads: any[] = [];

  createAd(storeId: number, productId: number, budget: number, targetAudience: string) {
    const ad = { storeId, productId, budget, targetAudience, status: 'active' };
    this.ads.push(ad);
    return ad;
  }

  getActiveAds() {
    return this.ads.filter(ad => ad.status === 'active');
  }

  stopAd(index: number) {
    if (this.ads[index]) {
      this.ads[index].status = 'stopped';
    }
  }
}