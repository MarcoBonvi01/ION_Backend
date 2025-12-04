import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data?: T) => {
        const response: ApiResponse<T> = {
          success: true,
          timestamp: Date.now(),
        };

        if (data !== undefined && data !== null) {
          response.data = data;
        }

        return response;
      }),
    );
  }
}
