import { LogType, WinstonLogger } from '@lxdhub/common';
import { LoggerService } from '@nestjs/common';

/**
 * The Winston Logger Strategy
 */
export class LogService extends WinstonLogger implements LoggerService {
    constructor(context: string, logLevel: LogType = 'info') {
        super(context, logLevel);
    }

    log(message: string): void {
        super.log(message);
    }

    error(message: string): void {
        super.error(message);
    }

    warn(message: string): void {
        super.warn(message);
    }
}
