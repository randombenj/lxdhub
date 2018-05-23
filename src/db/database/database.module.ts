import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getOrmConfig } from './database-ormconfig.constant';
import { DatabaseService } from './database.service';
import { IDatabaseSettings } from '.';

/**
 * The database module is used for database
 * related services.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot()
  ],
  components: [
    DatabaseService,
  ],
  exports: [
    DatabaseService
  ]
})
export class DatabaseModule {
  public static forRoot(settings?: IDatabaseSettings): DynamicModule {
    const ormConfig = getOrmConfig(settings);
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot(ormConfig)
      ],
      components: [
        DatabaseService,
      ],
      exports: [
        DatabaseService
      ]
    };
  }
}
