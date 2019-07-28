import { PaginationResponseDto } from '@lxdhub/interfaces';
import { SyncState } from '@lxdhub/db';

export type SyncRunListResponseDto = PaginationResponseDto<SyncRunItemDto[]>;

/**
 * The data transfer object, which represents a "not detailed"
 * sync run item. This class is used for larger sync run lists, which do not require
 * any detailed data of a sync run.
 */
export class SyncRunItemDto {
  id: number;
  state: SyncState;
  created: Date;
  started?: Date;
  ended?: Date;
  error?: string;
}
