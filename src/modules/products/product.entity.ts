import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  inStock: boolean;

  @Column({ default: 'pending' })
  approvalStatus: string;  // قيم ممكنة: 'pending', 'approved', 'rejected'

  @ManyToOne(() => Store, (store) => store.products)
  store: Store;
}
