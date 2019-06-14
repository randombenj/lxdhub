import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RemoteFactory } from './factories';
import { RemoteController } from './remote.controller';
import { RemoteService } from './remote.service';
import { Remote } from '@lxdhub/db';

@Module({
  imports: [
    TypeOrmModule.forFeature([Remote])
  ],
  controllers: [RemoteController],
  providers: [
    RemoteService,
    RemoteFactory,
  ],
  exports: [
    RemoteService,
    RemoteFactory,
  ]
})
/**
 * The remote module, which bundles all
 * operational or processable remote related
 * modules, controllers and components
 */
export class RemoteModule { }
