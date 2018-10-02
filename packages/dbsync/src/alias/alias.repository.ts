import { Alias } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

/**
 * The Alias repository represents the
 * interface between the appliaction Alias entity
 * and the database.
 */
@EntityRepository(Alias)
export class AliasRepository extends Repository<Alias> { }
