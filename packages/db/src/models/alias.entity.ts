import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Image } from '.';

@Entity()
export class Alias extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', default: true })
    name: string;

    @Column({ type: 'varchar', default: true })
    description: string;

    @ManyToOne(type => Image, image => image.aliases)
    image: Image;
}
