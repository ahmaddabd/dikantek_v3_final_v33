import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class NotificationsService {
  private io: Server;

  initialize(server: any) {
    this.io = new Server(server, { cors: { origin: '*' } });
  }

  sendNotification(event: string, data: any) {
    if (this.io) {
      this.io.emit(event, data);
    }
  }
}