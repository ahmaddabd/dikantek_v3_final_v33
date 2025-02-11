import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class ProductStock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.stock, { onDelete: 'CASCADE' })
  product: Product;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column()
  warehouseLocation: string;
}