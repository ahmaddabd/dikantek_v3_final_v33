import { Injectable, OnModuleInit } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class LoadBalancerService implements OnModuleInit {
  private workers: number;

  onModuleInit() {
    this.workers = os.cpus().length; // عدد الأنوية لاستخدامها في التحميل المتوازن
    console.log(`🔄 Load Balancer initialized with ${this.workers} workers.`);
  }

  getOptimalWorker(): number {
    return Math.floor(Math.random() * this.workers);
  }
}