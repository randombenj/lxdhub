import { DatabaseModule } from '@lxdhub/db';
import { DynamicModule } from '@nestjs/common';

import { LXDHubAPISettings } from '.';
import { AppSettingsModule } from './app-settings';
import { AppController } from './app.controller';
import { ImageAvailabilityModule } from './image-availability';
import { ImageModule } from './image/image.module';
import { LogModule } from './log';
import { LXDModule } from './lxd';
import { RemoteModule } from './remote';
import { SearchModule } from './search/search.module';
import { ThirdPartyModule } from './third-party/third-party.module';

/**
 * The main appliaction module for LXDHub
 */
export class AppModule {
    static forRoot(settings: LXDHubAPISettings): DynamicModule {
        return {
            module: AppModule,
            imports: [
                // AppSettingsModule.forRoot(settings),
                // DatabaseModule.forRoot({ ...settings.database, logLevel: settings.logLevel }),
                LogModule,
                ImageModule,
                ImageAvailabilityModule,
                RemoteModule,
                SearchModule,
                LXDModule,
                RemoteModule,
                ThirdPartyModule
            ],
            controllers: [AppController]
        };
    }
}
