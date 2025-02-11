import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class CacheService {
  private redisClient: Redis.Redis;

  constructor() {
    this.redisClient = new Redis({ host: 'localhost', port: 6379 });
  }

  async setCache(key: string, value: any, ttl: number = 3600): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async getCache(key: string): Promise<any> {
    const cachedData = await this.redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  async clearCache(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}