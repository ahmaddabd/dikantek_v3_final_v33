import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  previewImageUrl: string;

  @Column()
  themeFileUrl: string; // رابط تحميل القالب

  @Column({ default: true })
  isFree: boolean;
}
