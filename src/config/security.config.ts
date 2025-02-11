import { INestApplication } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as cors from 'cors';

export function configureSecurity(app: INestApplication) {
  // تمكين CORS لحماية الـ API
  app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));

  // تفعيل Helmet.js لحماية الرأس HTTP
  app.use(helmet());

  // الحد من الطلبات لمنع هجمات DDoS
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    max: 100, // 100 طلب لكل IP
    message: '🚨 Too many requests from this IP, please try again later.',
  }));
}