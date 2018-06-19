import { ImageAvailability } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

@EntityRepository(ImageAvailability)
export class ImageAvailabilityRepository extends Repository<ImageAvailability> { }

/**
 * This is a workaround, until custom TypeOrm
 * Repositories get supported by NestJS/TypeOrm.
 * See Github nestjs/typeorm#14
 *
 * https://github.com/nestjs/typeorm/issues/14
 */
export const ImageAvailabilityRepositoryProvider = {
    provide: 'ImageAvailabilityRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(ImageAvailabilityRepository),
    inject: [Connection]
};
