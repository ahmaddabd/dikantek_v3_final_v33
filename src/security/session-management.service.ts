import { Injectable } from '@nestjs/common';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import Redis from 'ioredis';

@Injectable()
export class SessionManagementService {
  private redisClient = new Redis({ host: 'localhost', port: 6379 });

  setupSession(app: any) {
    app.use(session({
      store: new (RedisStore(session))({ client: this.redisClient }),
      secret: process.env.SESSION_SECRET || 'default_secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true, httpOnly: true, maxAge: 3600000 },
    }));
  }
}