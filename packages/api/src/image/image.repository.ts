import { Image, ImageAvailability } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

import { PaginationOptionsDto } from '../shared';
import { ImageSearchLiteral } from './interfaces';

/**
 * The image repository represents the
 * interface between the appliaction image entity
 * and the database.
 */
@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {

    /**
     * Finds all images of an remote, filters them by the given
     * query attributes and applies the given pagination
     * options
     * @param remoteId The id of the remote
     * @param queryAttributes Array of search parameters, which should be filtered with
     * Operating Name or Architecture Name of an image
     * @param pagination The pagination options
     */
    async findByRemote(remoteId: number, pagination: PaginationOptionsDto, search: ImageSearchLiteral = {}): Promise<[Image[], number]> {
        // Get Images with the pagination options applied
        // from the database.
        let query = this
            .createQueryBuilder('image')
            // Join the remotes of the image
            .leftJoinAndSelect('image.imageAvailabilities', 'imageAvailability')
            .leftJoinAndSelect('imageAvailability.remote', 'remote')
            // Join the architecture and operating system
            .leftJoinAndSelect('image.osArchitecture', 'osArchitecture')
            .leftJoinAndSelect('osArchitecture.architecture', 'arch')
            .leftJoinAndSelect('osArchitecture.operatingSystem', 'os')

            // Check if is the requested remote
            .where('remote.id = :remoteId', { remoteId })
            // if the image is available on that remote
            .andWhere('imageAvailability.available = :available', { available: true });

        // Filter for distribution
        if (search.distribution) {
            query = query.andWhere('lower(os.distribution) LIKE lower(:os) ', { os: `%${search.distribution}%` });
        }

        // Filter for description
        if (search.desc) {
            query = query.andWhere('lower(image.description) LIKE lower(:desc) ', { desc: `%${search.desc}%` });
        }

        // Filter for architecture
        if (search.arch) {
            query = query.andWhere(
                '(lower(arch.processorName) LIKE :arch OR lower(arch.humanName) LIKE lower(:arch))',
                { arch: `%${search.arch}%` });
        }

        // Filter for fingerprint
        if (search.fingerprint) {
            query = query.andWhere('lower(image.fingerprint) LIKE lower(:fingerprint)', { fingerprint: `%${search.fingerprint}%` });
        }

        // Filter for version
        if (search.version) {
            query = query.andWhere('lower(os.version) LIKE lower(:version)', { version: `%${search.version}%`});
        }

        // Filter for release
        if (search.release) {
            query = query.andWhere('lower(os.release) LIKE Lower(:release)', { release: `%${search.release}%`});
        }

        // Apply pagintaion options
        return await query.offset(pagination.offset)
            .limit(pagination.limit)
            .getManyAndCount();
    }

    /**
     * Finds the image with the given id
     * @param pagination The pagination options
     */
    async findOneItem(id: number): Promise<Image> {
        return await this
            .createQueryBuilder('image')
            .where('image.id = :id', { id })
            .leftJoinAndSelect('image.aliases', 'alias')
            .leftJoinAndSelect('image.osArchitecture', 'osArchitecture')
            .leftJoinAndSelect('osArchitecture.architecture', 'arch')
            .leftJoinAndSelect('osArchitecture.operatingSystem', 'os')
            .leftJoinAndSelect('image.imageAvailabilities', 'imageAvailability')
            .leftJoinAndSelect('imageAvailability.remote', 'remote')
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
export const ImageRepositoryProvider = {
    provide: 'ImageRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(ImageRepository),
    inject: [Connection]
};
