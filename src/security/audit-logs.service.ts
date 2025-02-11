import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuditLogsService {
  private logFilePath = path.join(__dirname, '../../logs/audit.log');

  logAction(action: string, userId: number) {
    const logEntry = `${new Date().toISOString()} - User ${userId}: ${action}\n`;
    fs.appendFileSync(this.logFilePath, logEntry);
  }
}