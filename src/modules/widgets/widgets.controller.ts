import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WidgetsService } from './widgets.service';

@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Get()
  async getAllWidgets() {
    return this.widgetsService.getAllWidgets();
  }

  @Get(':id')
  async getWidgetById(@Param('id') id: number) {
    return this.widgetsService.getWidgetById(id);
  }

  @Post()
  async addWidget(
    @Body() body: { name: string; type: string; defaultConfig: string; previewImageUrl: string },
  ) {
    return this.widgetsService.addWidget(body.name, body.type, body.defaultConfig, body.previewImageUrl);
  }
}
