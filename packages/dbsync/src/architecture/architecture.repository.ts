import { Architecture } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

@EntityRepository(Architecture)
export class ArchitectureRepository extends Repository<Architecture> { }
