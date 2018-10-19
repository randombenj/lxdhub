import { Remote } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

/**
 * The remote repository represents the
 * interface between the appliaction remote entity
 * and the database.
 */
@EntityRepository(Remote)
export class RemoteRepository extends Repository<Remote> { }
