import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Widget } from './widget.entity';

@Injectable()
export class WidgetsService {
  constructor(
    @InjectRepository(Widget)
    private widgetsRepository: Repository<Widget>,
  ) {}

  async getAllWidgets(): Promise<Widget[]> {
    return this.widgetsRepository.find();
  }

  async getWidgetById(id: number): Promise<Widget> {
    return this.widgetsRepository.findOne({ where: { id } });
  }

  async addWidget(name: string, type: string, defaultConfig: string, previewImageUrl: string): Promise<Widget> {
    const widget = this.widgetsRepository.create({ name, type, defaultConfig, previewImageUrl });
    return this.widgetsRepository.save(widget);
  }
}
