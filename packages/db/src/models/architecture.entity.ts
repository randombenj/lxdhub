import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OperatingSystemArchitecture } from '.';

@Entity()
export class Architecture extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', default: true })
    processorName: string;

    @Column({ type: 'varchar', default: true })
    humanName: string;

    @OneToMany(type => OperatingSystemArchitecture, osarch => osarch.architecture)
    osArchitectures: OperatingSystemArchitecture[];
}
