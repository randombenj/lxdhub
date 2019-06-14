import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

import { LogService } from '.';

@Injectable()
/**
 * Logs every request
 */
export class RequestLoggerInterceptor implements NestInterceptor {
    private logger: LogService;
    /**
     * Inititalizes the RequestLoggerInterceptor
     * and its logger
     */
    constructor() {
        this.logger = new LogService('Request');
    }

    /**
     * Intercepts every request and logs it
     * @param context The execution context
     * @param call$ The stream to for callback
     */
    // @ts-ignore
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // Is actually a request
        const req = context.switchToHttp().getRequest();
        if (req.method) {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            let message = `Requesting ${req.method}: ${req.originalUrl} with IP ${ip}`;
            message += ` -> ${context.getClass().name}:${context.getHandler().name}`;
            this.logger.log(message);
        }
        return next.handle();
    }
}
