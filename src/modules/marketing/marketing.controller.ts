import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdType } from './marketing.entity';

@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCampaign(@Body() body: { storeId: number, type: AdType, budget: number, targetAudience: string, endDate: Date }) {
    return this.marketingService.createCampaign(body.storeId, body.type, body.budget, body.targetAudience, body.endDate);
  }

  @Get()
  async getCampaigns() {
    return this.marketingService.getCampaigns();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCampaign(@Param('id') id: number) {
    return this.marketingService.deleteCampaign(id);
  }
}