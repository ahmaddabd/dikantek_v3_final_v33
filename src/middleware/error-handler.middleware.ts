import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ErrorHandlerMiddleware implements ExceptionFilter {
  private readonly logger = new Logger(ErrorHandlerMiddleware.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message || 'Internal Server Error',
    };

    this.logger.error(`Error: ${JSON.stringify(errorResponse)}`);
    response.status(status).json(errorResponse);
  }
}