import { Alias } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

/**
 * The Alias repository represents the
 * interface between the appliaction Alias entity
 * and the database.
 */
@EntityRepository(Alias)
export class AliasRepository extends Repository<Alias> { }

/**
 * This is a workaround, until custom TypeOrm
 * Repositories get supported by NestJS/TypeOrm.
 * See Github nestjs/typeorm#14
 *
 * https://github.com/nestjs/typeorm/issues/14
 */
export const AliasRepositoryProvider = {
    provide: 'AliasRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(AliasRepository),
    inject: [Connection]
};
