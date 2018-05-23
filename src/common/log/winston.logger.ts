import Chalk from 'chalk';
import * as Winston from 'winston';

import { LogType } from '.';

const { combine, timestamp, label, printf } = Winston.format;

const format = (message, color) => `${Chalk.cyan(message.timestamp)} [${message.context}] ${Chalk[color](message.level)}: ${message.message}`;

/**
 * The Winston Logger Strategy
 */
export class WinstonLogger {
    private logger;
    constructor(private context: string, private level: LogType = 'info') {
        this.logger = Winston.createLogger({
            level,
            format: Winston.format.json(),
        });
        if (process.env.NODE_ENV !== 'production') {
            const myFormat = printf(message => {
                switch (message.level) {
                    case 'info':
                        return format(message, 'blue');
                    case 'error':
                        return format(message, 'red');
                    case 'warn':
                        return format(message, 'yellow');
                    case 'silly':
                        return format(message, 'gray');
                    default:
                        return format(message, 'blueBright');
                }
            });

            this.logger.add(new Winston.transports.Console({
                format: combine(
                    label(),
                    timestamp(),
                    myFormat
                )
            }));
        }
    }
    log(message: string) {
        this.logger.info(message, { context: this.context });
    }

    info(message: string) {
        this.log(message);
    }

    silly(message: string) {
        this.logger.silly(message, { context: this.context });
    }

    warn(message: string) {
        this.logger.warn(message, { context: this.context });
    }

    error(message: string): void {
        this.logger.error(message, { context: this.context });
    }

    debug(message: string) {
        this.logger.debug(message, { context: this.context });
    }
}
