import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Alias, ImageAvailability, OperatingSystemArchitecture } from '.';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    type => ImageAvailability,
    imageAvailability => imageAvailability.image
  )
  @JoinColumn()
  imageAvailabilities: ImageAvailability[];

  @Column({ unique: true, type: 'varchar', nullable: true })
  fingerprint?: string;

  /** The size in human-readable form (e.g. '12 kB') */
  @Column({ type: 'varchar', nullable: true })
  size?: string;

  @Column({ type: 'varchar', nullable: true })
  label?: string;

  @Column({ type: 'varchar', nullable: true })
  serial?: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'boolean', nullable: true })
  autoUpdate?: boolean;

  @Column({ type: 'varchar', nullable: true })
  createdAt?: Date;

  @Column({ type: 'varchar', nullable: true })
  expiresAt?: Date;

  @Column({ type: 'varchar', nullable: true })
  lastUsedAt?: Date;

  @Column({ type: 'varchar', nullable: true })
  uploadedAt?: Date;

  @ManyToOne(type => OperatingSystemArchitecture)
  osArchitecture: OperatingSystemArchitecture;

  @OneToMany(type => Alias, alias => alias.image)
  aliases: Alias[];

  @Column({ type: 'boolean', nullable: true })
  public?: boolean;

  /**
   * Returns a 12 character long fingerprint
   */
  get readableFingerprint() {
    return this.fingerprint.substring(0, 12);
  }
}
