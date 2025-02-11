import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity()
export class SalesReport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, store => store.salesReports, { onDelete: 'CASCADE' })
  store: Store;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalRevenue: number;

  @Column({ type: 'int' })
  totalOrders: number;

  @Column({ type: 'int' })
  totalCustomers: number;

  @CreateDateColumn()
  reportDate: Date;
}