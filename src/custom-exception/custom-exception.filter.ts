import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let message = exception.message;

    // Se for BadRequestException com ValidationPipe, extrai os detalhes
    if (exception instanceof BadRequestException) {
      const res = exception.getResponse();
      if (typeof res === 'object' && res['message']) {
        message = res['message']; // aqui pega o array de erros do class-validator
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
