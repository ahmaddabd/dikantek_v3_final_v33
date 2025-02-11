import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discountValue: number;

  @Column()
  discountType: string; // 'fixed' أو 'percentage'

  @Column()
  maxUsage: number;

  @Column({ default: 0 })
  usedCount: number;

  @Column({ type: 'timestamp' })
  expiryDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
