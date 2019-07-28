import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export enum SyncState {
  NOT_STARTED = 0,
  RUNNING = 1,
  FAILED = 2,
  SUCCEEDED = 3,
}

/**
 * Represents a run by the database synchronization tool
 */
@Entity()
export class SyncRun extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: Date.now() })
  created: Date;

  @Column({ type: 'varchar', nullable: true })
  started?: Date;

  @Column({ type: 'varchar', nullable: true })
  ended?: Date;

  @Column({ type: 'enum', enum: SyncState, default: SyncState.NOT_STARTED  })
  state: SyncState;

  @Column({ type: 'varchar', nullable: true })
  error?: string;
}