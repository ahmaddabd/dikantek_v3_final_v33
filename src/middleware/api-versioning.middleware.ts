import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiVersioningMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const version = req.headers['api-version'] || 'v1';
    req.url = `/${version}${req.url}`; // إعادة توجيه الطلبات إلى الإصدار الصحيح
    next();
  }
}