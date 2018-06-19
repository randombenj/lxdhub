import { Remote } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

/**
 * The remote repository represents the
 * interface between the appliaction remote entity
 * and the database.
 */
@EntityRepository(Remote)
export class RemoteRepository extends Repository<Remote> { }

/**
 * This is a workaround, until custom TypeOrm
 * Repositories get supported by NestJS/TypeOrm.
 * See Github nestjs/typeorm#14
 *
 * https://github.com/nestjs/typeorm/issues/14
 */
export const RemoteRepositoryProvider = {
    provide: 'RemoteRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(RemoteRepository),
    inject: [Connection]
};
