import { Remote } from '@lxdhub/db';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RemoteFactory } from './factories';
import { RemoteController } from './remote.controller';
import { RemoteRepository } from './remote.repository';
import { RemoteService } from './remote.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Remote, RemoteRepository])
  ],
  controllers: [RemoteController],
  providers: [
    RemoteFactory,
    RemoteService,
  ],
  exports: [
    RemoteService,
    RemoteFactory
  ]
})
/**
 * The remote module, which bundles all
 * operational or processable remote related
 * modules, controllers and components
 */
export class RemoteModule { }
