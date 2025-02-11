import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Payment } from '../payments/payment.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.invoices, { onDelete: 'CASCADE' })
  customer: User;

  @ManyToOne(() => Payment, payment => payment.invoices, { onDelete: 'CASCADE' })
  payment: Payment;

  @Column()
  invoiceNumber: string;

  @Column()
  totalAmount: number;

  @Column()
  pdfUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}