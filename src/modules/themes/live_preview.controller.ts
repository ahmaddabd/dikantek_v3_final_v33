import { Controller, Post, Body } from '@nestjs/common';
import { LivePreviewService } from './live_preview.service';

@Controller('live-preview')
export class LivePreviewController {
  constructor(private readonly livePreviewService: LivePreviewService) {}

  @Post('update')
  async sendUpdate(@Body() body: { userId: number; updatedConfig: any }) {
    this.livePreviewService.sendUpdate(body);
    return { message: 'Live preview updated successfully' };
  }
}
