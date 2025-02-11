import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Widget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  type: string; // "text", "image", "product_list", "testimonial", etc.

  @Column({ type: 'text' })
  defaultConfig: string; // JSON for default settings

  @Column()
  previewImageUrl: string; // Image preview for the widget
}
