import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class ShippingOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.shipping, { onDelete: 'CASCADE' })
  order: Order;

  @Column()
  carrier: string; // DHL, FedEx, Aramex

  @Column()
  trackingNumber: string;

  @Column({ default: 'Processing' })
  status: string; // Processing, Shipped, Delivered

  @CreateDateColumn()
  shippedAt: Date;
}