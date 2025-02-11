import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserActivity } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(UserActivity)
    private reportsRepository: Repository<UserActivity>,
  ) {}

  async logActivity(userId: number, action: string, metadata: string): Promise<UserActivity> {
    const activity = this.reportsRepository.create({ user: { id: userId }, action, metadata });
    return this.reportsRepository.save(activity);
  }

  async getUserActivity(userId: number): Promise<UserActivity[]> {
    return this.reportsRepository.find({ where: { user: { id: userId } } });
  }

  async generateReport(): Promise<any> {
    const activities = await this.reportsRepository.createQueryBuilder('activity')
      .select("activity.action, COUNT(activity.id) as count")
      .groupBy("activity.action")
      .getRawMany();

    return { summary: activities };
  }
}