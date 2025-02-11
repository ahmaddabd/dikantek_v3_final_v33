import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway {
  @SubscribeMessage('notify')
  handleNotification(@MessageBody() message: string): string {
    return `Notification received: ${message}`;
  }
}