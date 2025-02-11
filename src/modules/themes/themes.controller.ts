import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ThemesService } from './themes.service';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Get()
  async getAllThemes() {
    return this.themesService.getAllThemes();
  }

  @Get(':id')
  async getThemeById(@Param('id') id: number) {
    return this.themesService.getThemeById(id);
  }

  @Post()
  async addTheme(
    @Body() body: { name: string; description: string; previewImageUrl: string; themeFileUrl: string; isFree: boolean },
  ) {
    return this.themesService.addTheme(body.name, body.description, body.previewImageUrl, body.themeFileUrl, body.isFree);
  }
}
