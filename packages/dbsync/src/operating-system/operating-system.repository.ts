import { OperatingSystem } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

@EntityRepository(OperatingSystem)
export class OperatingSystemRepository extends Repository<OperatingSystem> { }

/**
 * This is a workaround, until custom TypeOrm
 * Repositories get supported by NestJS/TypeOrm.
 * See Github nestjs/typeorm#14
 *
 * https://github.com/nestjs/typeorm/issues/14
 */
export const OperatingSystemRepositoryProvider = {
    provide: 'OperatingSystemRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(OperatingSystemRepository),
    inject: [Connection]
};
