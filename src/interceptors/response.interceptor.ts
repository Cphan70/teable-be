import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  DefaultResponseDto,
  GenericResponseDto,
} from '../common/dto/generic-response.dto';
import { MESSAGE_CODE } from '../constants';
import { Request, Response } from 'express';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, DefaultResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<GenericResponseDto<T>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    return next.handle().pipe(
      map((data: DefaultResponseDto<T>) => {
        if (req.method === 'POST') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          if (res?.statusCode === HttpStatus.CREATED) {
            res.status(HttpStatus.OK);
          }
        }
        return {
          code: res?.statusCode,
          message: data?.message || MESSAGE_CODE.DEFAULT_SUCCESS,
          data: data?.data,
        } as GenericResponseDto<T>;
      }),
    );
  }
}
