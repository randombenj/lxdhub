import { OperatingSystemArchitecture } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

@EntityRepository(OperatingSystemArchitecture)
export class OperatingSystemArchitectureRepository extends Repository<OperatingSystemArchitecture> { }
