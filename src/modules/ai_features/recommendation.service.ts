import { Injectable } from '@nestjs/common';

@Injectable()
export class RecommendationService {
  generateRecommendations(userPurchaseHistory: any[]): any[] {
    const recommendations = userPurchaseHistory.map(purchase => ({
      recommendedProduct: purchase.productId + 1, // مثال افتراضي
      reason: 'Based on your past purchases',
    }));
    return recommendations.slice(0, 5);
  }
}