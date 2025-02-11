import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway({ cors: true })
export class LivePreviewService {
  @WebSocketServer()
  server: Server;

  sendUpdate(data: any) {
    this.server.emit('live-update', data);
  }
}
