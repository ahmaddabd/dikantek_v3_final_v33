import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    max: 100, // الحد الأقصى للطلبات
    message: 'Too many requests, please try again later.',
  });

  use(req: any, res: any, next: () => void) {
    this.limiter(req, res, (err) => {
      if (err) {
        throw new HttpException('Rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS);
      }
      next();
    });
  }
}
