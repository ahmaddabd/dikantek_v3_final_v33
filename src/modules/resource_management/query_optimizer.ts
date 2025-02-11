import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class QueryOptimizerService {
  constructor(private readonly dataSource: DataSource) {}

  async optimizeDatabase(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query('ANALYZE;'); // تحسين أداء قاعدة البيانات عبر تحليل الفهارس والاستعلامات
    await queryRunner.release();
    console.log('✅ Database optimization completed.');
  }
}