import { OperatingSystem } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

@EntityRepository(OperatingSystem)
export class OperatingSystemRepository extends Repository<OperatingSystem> { }
