import { Injectable, OnModuleInit } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class AutoScalingService implements OnModuleInit {
  onModuleInit() {
    console.log('🔄 Checking system resources for auto-scaling...');
    setInterval(() => {
      const freeMem = os.freemem() / os.totalmem();
      if (freeMem < 0.2) {
        console.log('⚠️ Low memory detected. Consider scaling up resources!');
      }
    }, 30000);
  }
}