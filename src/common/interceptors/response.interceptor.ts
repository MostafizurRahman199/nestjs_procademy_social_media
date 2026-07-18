import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BYPASS_RESPONSE_KEY } from '../decorators/bypass-response.decorator';

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, any>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const isBypassed = this.reflector.getAllAndOverride<boolean>(
      BYPASS_RESPONSE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isBypassed) {
      return next.handle();
    }

    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        let message = 'Request completed successfully';
        let resultData = data;

        // If the service/controller returned an object, check if it has a custom message/data
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          if ('message' in data && typeof data.message === 'string') {
            message = data.message;
            
            // Extract the actual payload from the returned object if possible
            const keys = Object.keys(data);
            if (keys.length === 2) {
              const otherKey = keys.find((key) => key !== 'message');
              if (otherKey) {
                resultData = data[otherKey];
              }
            } else if (keys.length === 1) {
              // Just a message was returned (e.g. Delete response)
              resultData = null;
            }
          }
        }

        return {
          success: true,
          statusCode,
          message,
          data: resultData,
        };
      }),
    );
  }
}
