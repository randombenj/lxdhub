import { Architecture } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

@EntityRepository(Architecture)
export class ArchitectureRepository extends Repository<Architecture> { }

/**
 * This is a workaround, until custom TypeOrm
 * Repositories get supported by NestJS/TypeOrm.
 * See Github nestjs/typeorm#14
 *
 * https://github.com/nestjs/typeorm/issues/14
 */
export const ArchitectureRepositoryProvider = {
    provide: 'ArchitectureRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(ArchitectureRepository),
    inject: [Connection]
};
