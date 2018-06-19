import { OperatingSystemArchitecture } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

@EntityRepository(OperatingSystemArchitecture)
export class OperatingSystemArchitectureRepository extends Repository<OperatingSystemArchitecture> { }

export const OperatingSystemArchitectureRepositoryProvider = {
    provide: 'OperatingSystemArchitectureRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(OperatingSystemArchitectureRepository),
    inject: [Connection]
};
