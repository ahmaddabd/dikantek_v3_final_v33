import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PerformanceService implements OnModuleInit {
  onModuleInit() {
    console.log('🚀 Performance monitoring started...');
  }

  optimizeAPIResponse(data: any) {
    return JSON.stringify(data, (_, v) => (typeof v === 'bigint' ? v.toString() : v)); // تحسين معالجة البيانات الكبيرة
  }
}