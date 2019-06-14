import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RemoteDto } from '.';
import { ResponseDto } from '../common';
import { RemoteFactory } from './factories';
import { Remote } from '@lxdhub/db';
import { Repository } from 'typeorm';

/**
 * Interface between the Database and API for
 * Remote operations.
 */
@Injectable()
export class RemoteService {
  /**
   * Initializes the RemoteService.
   */
  constructor(
    private remoteFactory: RemoteFactory,
    @InjectRepository(Remote)
    private remoteRepository: Repository<Remote>
  ) {}

  /**
   * Returns all remotes and
   * transforms the database remotes into data-transfer-objects
   */
  async findAll(): Promise<ResponseDto<RemoteDto[]>> {
    const [remotes] = await this.remoteRepository
      .createQueryBuilder('remote')
      .getManyAndCount();
    return new ResponseDto<RemoteDto[]>(
      this.remoteFactory.entitiesToDto(remotes)
    );
  }

  /**
   * Returns a remote by the given name
   * @param {string} name The name of the remote
   *
   * @exception {NotFoundException} Gets the the given name does not exist in the database
   */
  async findByName(name): Promise<Remote> {
    let remote: Remote;
    try {
      remote = await this.remoteRepository.findOne({ where: { name } });
      if (!remote) {
        throw new NotFoundException(`Remote #${name} not found`);
      }
      return remote;
    } catch (err) {
      throw new NotFoundException(`Remote '${name}' not found`);
    }
  }

  /**
   * Returns a remote by the given id
   * @param {number} id The id of the remote
   *
   * @exception {NotFoundException} Gets the the given id does not exist in the database
   */
  async findById(id): Promise<Remote> {
    let remote: Remote;
    try {
      remote = await this.remoteRepository.findOne({ where: { id } });
      if (!remote) {
        throw new NotFoundException(`Remote #${id} not found`);
      }
      return remote;
    } catch (err) {
      throw new NotFoundException(`Remote #${id} not found`);
    }
  }
}
