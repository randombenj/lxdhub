import { ImageAvailability } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

/**
 * The ImageAvailabilityRepository represents the
 * interface between the appliaction image availability entity
 * and the database.
 */
@EntityRepository(ImageAvailability)
export class ImageAvailabilityRepository extends Repository<ImageAvailability> {

    /**
     * Returns the image availability by the remote and image id
     * @param remoteId The remote id
     * @param imageId The image id
     */
    async getImageByRemoteAndImage(remoteId: number, imageId: number): Promise<ImageAvailability> {
        return await this
            .createQueryBuilder('imageAvailability')
            .leftJoinAndSelect('imageAvailability.image', 'image')
            .leftJoinAndSelect('imageAvailability.remote', 'remote')
            .where('remote.id = :remoteId', { remoteId })
            .andWhere('image.id = :imageId', { imageId })
            .getOne();
    }
}

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
