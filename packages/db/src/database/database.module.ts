import { DynamicModule, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IDatabaseSettings } from '.';
import { getOrmConfig } from './database-ormconfig.constant';
import { DatabaseService } from './database.service';
import { Connection } from 'typeorm';

/**
 * The database module is used for database
 * related services.
 */
@Global()
export class DatabaseModule {
  public static forRoot(settings?: IDatabaseSettings): DynamicModule {
    const ormConfig = getOrmConfig(settings);
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot(ormConfig as any)
      ],
      providers: [
        DatabaseService
      ],
      exports: [
        DatabaseService
      ]
    };
  }
}
