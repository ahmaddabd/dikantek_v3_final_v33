import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryAutomationService {
  analyzeStockLevels(stockData: any[]): any[] {
    return stockData.map(item => ({
      productId: item.productId,
      restockRequired: item.quantity < 10,
    }));
  }
}