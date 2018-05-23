import { ILXDHubService, ILXDRemoteAuthentication, LogType } from '@lxdhub/common';
import { IDatabaseSettings } from '@lxdhub/db';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception';
import { LogService } from './log';
import { RequestLoggerInterceptor } from './log/request-logger.interceptor';

/**
 * The LXDHub API settings
 */
export class LXDHubAPISettings {
    @IsInt()
    @Type(() => Number)
    port?: number = 3000;
    @IsString()
    @Type(() => String)
    hostUrl?: string = '0.0.0.0';
    database: IDatabaseSettings;
    lxd?: ILXDRemoteAuthentication;
    logLevel?: LogType = 'silly';
    docUrl: string = '/api/v1/doc';
}

/**
 * The LXDHub API is the interface for the
 * LXDHub Web user interface.
 */
export class LXDHubAPI implements ILXDHubService {
    private app: INestApplication;
    private logger: LogService;
    constructor(private settings: LXDHubAPISettings) {
        this.logger = new LogService('LXDHubAPI', settings.logLevel);
    }

    setupSwagger() {
        const options = new DocumentBuilder()
            .setTitle('LXDHub API')
            .setDescription('Display, search and copy LXD images using a web interface.')
            .setVersion('1.0')
            .build();

        const document = SwaggerModule.createDocument(this.app, options);
        SwaggerModule.setup(this.settings.docUrl || '/api/v1/doc', this.app, document);
    }

    async bootstrap() {
        this.app = await NestFactory.create(AppModule.forRoot(this.settings), {
            logger: this.logger
        });

        this.setupSwagger();

        // Global execution handler
        this.app.useGlobalFilters(new HttpExceptionFilter());
        // Global request loger
        this.app.useGlobalInterceptors(new RequestLoggerInterceptor());

        // In development, allow any origin to access the website
        if (process.env.NODE_ENV !== 'production') {
            this.app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                next();
            });
        }

        // Allow the following headers
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, DEVICE_ID, SSO_TOKEN');
            next();
        });

    }

    /**
     * Starts LXDHub API with the given conifgurations
     */
    async run() {
        this.logger.log('Bootstraping application');
        try {
            await this.bootstrap();
        }
        catch (err) {
            err = err as Error;
            this.logger.error(`An error occured while bootstraping the application`);
            this.logger.error(err.message);
        }
        // Starts listening on the given port and host url
        await this.app.listen(this.settings.port, this.settings.hostUrl);
        this.logger.log(`Open on http://${this.settings.hostUrl}:${this.settings.port}`);
    }
}
