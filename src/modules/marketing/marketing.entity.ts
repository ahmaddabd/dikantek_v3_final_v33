import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Store } from '../stores/store.entity';

export enum AdType {
  SPONSORED_PRODUCT = 'sponsored_product',
  STORE_PROMOTION = 'store_promotion',
}

@Entity()
export class AdCampaign {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, store => store.adCampaigns, { onDelete: 'CASCADE' })
  store: Store;

  @Column({ type: 'enum', enum: AdType })
  type: AdType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  budget: number;

  @Column()
  targetAudience: string; // demographic targeting info

  @CreateDateColumn()
  startDate: Date;

  @Column()
  endDate: Date;
}