import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.wishlist, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, product => product.wishlist, { onDelete: 'CASCADE' })
  product: Product;
}