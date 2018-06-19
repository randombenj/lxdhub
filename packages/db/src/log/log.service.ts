import { LogType, WinstonLogger } from '@lxdhub/common';
import { Logger, QueryRunner } from 'typeorm';

/**
 * The log service implementation for the typeorm logger
 */
export class LogService implements Logger {
    private logger: WinstonLogger;

    /**
     * Initializes the log service
     * @param logLevel The level of the logger
     */
    constructor(logLevel: LogType = 'info') {
        this.logger = new WinstonLogger('LXDHubDB', logLevel);
    }

    private formatMessage(type: string, query: string, parameters?: any[], error?: string, time?: number) {
        let msg = type;
        msg += `\nExecuted query: ${query}`;
        msg += parameters && parameters.length ? `\nQuery Parameter: ${JSON.stringify(parameters)}` : '';
        msg += error ? `\nError: ${error}` : '';
        msg += time ? `\nTime: ${time}` : '';
        return msg;
    }

    /**
     * Logs a query
     * @param query The query
     * @param parameters The query parameters
     */
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.debug(this.formatMessage('LogQuery', query, parameters));
    }

    /**
     * Logs a query error
     * @param error The error message of the query
     * @param query The query
     * @param parameters The parameters of the query
     */
    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.error(this.formatMessage('QueryError', query, parameters, error));
    }
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.warn(this.formatMessage('SlowQuery', query, parameters, undefined, time));
    }
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        this.logger.silly(message);
    }
    logMigration(message: string, queryRunner?: QueryRunner) {
        this.logger.info(message);
    }
    log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
        this.logger[level](message);
    }
}
