import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class LoyaltyPoints {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.loyaltyPoints, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'int', default: 0 })
  points: number;

  @CreateDateColumn()
  earnedAt: Date;
}