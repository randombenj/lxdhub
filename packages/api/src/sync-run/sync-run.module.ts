import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncRun } from '@lxdhub/db';
import { SyncRunRepository } from './sync-run.repository';
import { SyncRunService } from './sync-run.service';
import { SyncRunListResponseFactory } from './factories';
import { SyncRunController } from './sync-run.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SyncRun, SyncRunRepository])],
  providers: [SyncRunService, SyncRunListResponseFactory],
  controllers: [SyncRunController]
})
export class SyncRunModule {}
