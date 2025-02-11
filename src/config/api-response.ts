import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;

  constructor(success: boolean, data?: T, error?: string) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  static success<T>(data: T): ApiResponse<T> {
    return new ApiResponse<T>(true, data, undefined);
  }

  static error(message: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST): never {
    throw new HttpException(new ApiResponse(false, undefined, message), statusCode);
  }
}