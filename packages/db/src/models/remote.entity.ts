import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Image, ImageAvailability } from '.';

@Entity()
export class Remote extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', default: true })
    serverUrl: string;

    @Column({ type: 'varchar', default: true })
    protocol: string;

    @Column({ type: 'boolean', default: true })
    readonly: boolean;

    @Column({ type: 'boolean', default: false })
    public: boolean;

    @Column({ type: 'varchar', nullable: true })
    name: string;

    @OneToMany(type => ImageAvailability, imageAvailability => imageAvailability.remote)
    imageAvailabilities: ImageAvailability[];
}
