import { Image } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

/**
 * The Image repository represents the
 * interface between the appliaction Image entity
 * and the database.
 */
@EntityRepository(Image)
export class ImageRepository extends Repository<Image> { }

/**
 * This is a workaround, until custom TypeOrm
 * Repositories get supported by NestJS/TypeOrm.
 * See Github nestjs/typeorm#14
 *
 * https://github.com/nestjs/typeorm/issues/14
 */
export const ImageRepositoryProvider = {
    provide: 'ImageRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(ImageRepository),
    inject: [Connection]
};
