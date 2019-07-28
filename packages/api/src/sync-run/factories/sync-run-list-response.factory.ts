import { Factory } from '@lxdhub/common';
import { Injectable } from '@nestjs/common';
import { SyncRun } from '@lxdhub/db';
import { SyncRunItemDto } from '../';
import { classToPlain } from 'class-transformer';

@Injectable()
export class SyncRunListResponseFactory extends Factory<SyncRunItemDto> {
  entityToDto(syncRun: SyncRun): SyncRunItemDto {
    return classToPlain<SyncRunItemDto>(syncRun) as SyncRunItemDto;
  }
}
