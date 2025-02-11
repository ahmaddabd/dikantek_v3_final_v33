import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string; // URL-friendly name for routing

  @ManyToOne(() => User, user => user.stores, { onDelete: 'CASCADE' })
  owner: User;

  @Column({ default: false })
  customDomainEnabled: boolean;

  @Column({ nullable: true })
  customDomain: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}