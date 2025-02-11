import { Injectable } from '@nestjs/common';

@Injectable()
export class AffiliateProgramService {
  private affiliates: any[] = [];

  registerAffiliate(userId: number) {
    const affiliate = { userId, earnings: 0, referralLinks: [] };
    this.affiliates.push(affiliate);
    return affiliate;
  }

  trackReferral(affiliateId: number, storeId: number) {
    const affiliate = this.affiliates.find(a => a.userId === affiliateId);
    if (affiliate) {
      affiliate.referralLinks.push({ storeId, commission: 10 });
      affiliate.earnings += 10; // منح عمولة افتراضية
    }
  }

  getAffiliateEarnings(userId: number) {
    return this.affiliates.find(a => a.userId === userId)?.earnings || 0;
  }
}