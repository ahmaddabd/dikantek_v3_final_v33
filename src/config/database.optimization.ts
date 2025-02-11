import { DataSource } from 'typeorm';

export const optimizeDatabase = async (dataSource: DataSource) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.query('VACUUM; ANALYZE;'); // تحسين أداء قاعدة البيانات PostgreSQL
  await queryRunner.release();
};