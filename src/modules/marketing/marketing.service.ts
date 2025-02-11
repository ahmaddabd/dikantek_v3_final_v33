import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdCampaign, AdType } from './marketing.entity';

@Injectable()
export class MarketingService {
  constructor(
    @InjectRepository(AdCampaign)
    private marketingRepository: Repository<AdCampaign>,
  ) {}

  async createCampaign(storeId: number, type: AdType, budget: number, targetAudience: string, endDate: Date): Promise<AdCampaign> {
    const startDate = new Date();
    const campaign = this.marketingRepository.create({ store: { id: storeId }, type, budget, targetAudience, startDate, endDate });
    return this.marketingRepository.save(campaign);
  }

  async getCampaigns(): Promise<AdCampaign[]> {
    return this.marketingRepository.find({ relations: ['store'] });
  }

  async deleteCampaign(campaignId: number): Promise<boolean> {
    const campaign = await this.marketingRepository.findOne({ where: { id: campaignId } });
    if (!campaign) throw new NotFoundException('Campaign not found');

    await this.marketingRepository.remove(campaign);
    return true;
  }
}