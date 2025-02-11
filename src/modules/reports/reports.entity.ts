import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class UserActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.activities, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  action: string; // مثل "purchase", "login", "search"

  @Column()
  metadata: string; // تفاصيل مثل ID المنتج، الفئة، وغيرها

  @CreateDateColumn()
  timestamp: Date;
}