import { ManyToOne, OneToMany, Entity, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { OperatingSystem, Architecture } from '.';

@Entity()
export class OperatingSystemArchitecture {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => OperatingSystem, os => os.osArchitectures)
    @JoinTable()
    operatingSystem: OperatingSystem;

    @ManyToOne(type => Architecture, arch => arch.osArchitectures)
    @JoinTable()
    architecture: Architecture;
}
