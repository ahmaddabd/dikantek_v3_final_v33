import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from './theme.entity';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private themesRepository: Repository<Theme>,
  ) {}

  async getAllThemes(): Promise<Theme[]> {
    return this.themesRepository.find();
  }

  async getThemeById(id: number): Promise<Theme> {
    return this.themesRepository.findOne({ where: { id } });
  }

  async addTheme(name: string, description: string, previewImageUrl: string, themeFileUrl: string, isFree: boolean): Promise<Theme> {
    const theme = this.themesRepository.create({ name, description, previewImageUrl, themeFileUrl, isFree });
    return this.themesRepository.save(theme);
  }
}
