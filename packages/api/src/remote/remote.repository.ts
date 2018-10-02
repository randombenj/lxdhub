import { Remote } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

/**
 * The remote repository represents the
 * interface between the appliaction remote entity
 * and the database.
 */
@EntityRepository(Remote)
export class RemoteRepository extends Repository<Remote> {
    /**
     * Finds all remotes
     */
    async findAll(): Promise<[Remote[], number]> {
        // Get all remotes
        return await this
            .createQueryBuilder('remote')
            .getManyAndCount();
    }

    /**
     * Finds one remote by the given id
     * @param id The id of the remote
     */
    async findOneItem(id: number): Promise<Remote> {
        return await this
            .createQueryBuilder('remote')
            .where('remote.id = :id', { id })
            .getOne();
    }
}
