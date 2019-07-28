import { Injectable } from '@nestjs/common';
import { PaginationOptionsDto, PaginationResponseDto } from '../common';
import { SyncRunRepository } from './sync-run.repository';
import { SyncRunListResponseFactory } from './factories';
import { SyncRunItemDto } from './dtos';

@Injectable()
export class SyncRunService {
  constructor(
    private readonly syncRunRepository: SyncRunRepository,
    private readonly syncRunFactory: SyncRunListResponseFactory
  ) {}

  async paginate(pagination: PaginationOptionsDto) {
    const [syncRuns, total] = await this.syncRunRepository.paginate(pagination);

    return new PaginationResponseDto<SyncRunItemDto[]>(
      this.syncRunFactory.entitiesToDto(syncRuns),
      total,
      pagination
    );
  }
}
