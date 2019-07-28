import { Test } from '@nestjs/testing';
import { SyncRunListResponseFactory } from './sync-run-list-response.factory';
import { SyncRun } from '@lxdhub/db';
import { SyncRunItemDto } from '../dtos';

describe('SyncRunListResponseFactory', () => {
  let factory: SyncRunListResponseFactory;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SyncRunListResponseFactory]
    }).compile();

    factory = module.get(SyncRunListResponseFactory);
  });

  it('should transform the SyncRun class to the dto', () => {
    const syncRun = new SyncRun();
    const date = new Date(Date.now());
    syncRun.created = date;
    syncRun.id = 1;
    syncRun.state = 1;

    const syncRunDto = new SyncRunItemDto();
    syncRunDto.created = date;
    syncRunDto.id = 1;
    syncRunDto.state = 1;

    expect(factory.entityToDto(syncRun)).toEqual(syncRunDto);
  });
});
