import { Injectable } from '@nestjs/common';
import { Queue, Worker } from 'bullmq';

@Injectable()
export class BackgroundJobService {
  private jobQueue: Queue;

  constructor() {
    this.jobQueue = new Queue('jobQueue', { connection: { host: 'localhost', port: 6379 } });
  }

  async addJob(name: string, data: any) {
    await this.jobQueue.add(name, data, { attempts: 3, backoff: 5000 });
  }

  async processJobs() {
    new Worker('jobQueue', async job => {
      console.log(`🔄 Processing job: ${job.name}`, job.data);
    }, { connection: { host: 'localhost', port: 6379 } });
  }
}