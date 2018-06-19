import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Alias, ImageAvailability, OperatingSystemArchitecture } from '.';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => ImageAvailability, imageAvailability => imageAvailability.image)
  @JoinColumn()
  imageAvailabilities: ImageAvailability[];

  @Column({ unique: true, type: 'varchar' })
  fingerprint: string;

  @Column('integer')
  size: number;

  @Column({ type: 'varchar', nullable: true })
  label?: string;

  @Column({ type: 'varchar', nullable: true })
  serial?: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'boolean', nullable: true })
  autoUpdate?: boolean;

  @Column('varchar')
  createdAt: Date;

  @Column('varchar')
  expiresAt: Date;

  @Column('varchar')
  lastUsedAt: Date;

  @Column('varchar')
  uploadedAt: Date;

  @ManyToOne(type => OperatingSystemArchitecture)
  osArchitecture: OperatingSystemArchitecture;

  @OneToMany(type => Alias, alias => alias.image)
  aliases: Alias[];

  @Column('boolean')
  public: boolean;
}
