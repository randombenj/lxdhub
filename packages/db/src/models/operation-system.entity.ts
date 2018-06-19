import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Image, OperatingSystemArchitecture } from '.';

@Entity()
export class OperatingSystem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', default: true })
    distribution: string;

    @Column({ type: 'varchar', default: true })
    release: string;

    @Column({ type: 'varchar', default: true })
    version: string;

    @OneToMany(type => OperatingSystemArchitecture, osarch => osarch.operatingSystem)
    osArchitectures: OperatingSystemArchitecture[];

}
