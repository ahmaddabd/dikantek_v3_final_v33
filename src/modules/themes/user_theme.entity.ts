import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Theme } from './theme.entity';

@Entity()
export class UserTheme {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Theme, (theme) => theme.id)
  theme: Theme;

  @Column({ type: 'text' })
  customConfig: string; // JSON لتخزين التعديلات المخصصة

  @Column({ default: false })
  isPublished: boolean;
}
