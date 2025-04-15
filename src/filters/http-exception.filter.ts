import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  Logger,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { exceptionParse } from '../utils/exception-parse';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { ILoggerConfig } from '../configs/logger.config';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly configService: ConfigService) {}

  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const { enableGlobalErrorLogging } =
      this.configService.getOrThrow<ILoggerConfig>('logger');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log({ exception });

    if (
      enableGlobalErrorLogging ||
      !(
        exception instanceof BadRequestException ||
        exception instanceof UnauthorizedException ||
        exception instanceof ForbiddenException ||
        exception instanceof NotFoundException ||
        exception instanceof NotImplementedException
      )
    ) {
      this.logError(exception, request);
    }

    const customHttpException = exceptionParse(exception);
    const status = customHttpException.getStatus();
    return response.status(status).json({
      message: customHttpException.message,
      status: status,
      code: customHttpException.code,
      data: customHttpException.data,
    });
  }

  protected logError(exception: Error, request: Request) {
    this.logger.error(
      {
        url: request?.url,
        message: exception.message,
      },
      exception.stack,
    );
  }
}
