import { DynamicModule, Global } from '@nestjs/common';

import { LXDHubAPISettings } from '.';
import { DatabaseModule } from '@lxdhub/db';
import { ImageModule } from './image/image.module';
import { LogModule } from './log';
import { AppController } from './app.controller';
import { AppSettingsModule } from './app-settings';
import { SearchModule } from './search/search.module';
import { LXDModule } from './lxd';
import { RemoteModule } from './remote';
import { ImageAvailabilityModule } from './image-availability';
import { FsProvider, PathProvider } from './third-party';
import { ThirdPartyModule } from './third-party/third-party.module';

/**
 * The main appliaction module for LXDHub
 */
export class AppModule {
    static forRoot(settings: LXDHubAPISettings): DynamicModule {
        return {
            module: AppModule,
            imports: [
                AppSettingsModule.forRoot(settings),
                DatabaseModule.forRoot({ ...settings.database, logLevel: settings.logLevel }),
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
