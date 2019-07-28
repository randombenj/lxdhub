import { Module } from '@nestjs/common';
import { SyncRunService } from './sync-run.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncRun } from '@lxdhub/db';

@Module({
  imports: [TypeOrmModule.forFeature([SyncRun])],
  providers: [SyncRunService],
  exports: [SyncRunService]
})
export class SyncRunModule {}
