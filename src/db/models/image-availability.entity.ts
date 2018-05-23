import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Image, Remote } from '.';

@Entity()
export class ImageAvailability extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'boolean',
        default: true
    })
    available: boolean;

    @ManyToOne(type => Image, image => image.imageAvailabilities)
    image: Image;

    @ManyToOne(type => Remote, remote => remote.imageAvailabilities)
    remote: Remote;
}
