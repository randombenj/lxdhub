import { Interfaces } from '@lxdhub/common';
import { Remote } from '@lxdhub/db';
import { Injectable, Inject, Logger } from '@nestjs/common';

import { LXDHubDbSyncSettings } from '../dbsync-settings.interface';
import { RemoteDto } from './dtos/remote.dto';
import { RemoteFactory } from './factories/remote.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RemoteService {
    private logger: Logger;

    constructor(
        @InjectRepository(Remote)
        private remoteRepository: Repository<Remote>,
        private remoteFactory: RemoteFactory,
        @Inject('LXDHubDbSyncSettings')
        private dbSyncSettings: LXDHubDbSyncSettings
    ) {
        this.logger = new Logger('RemoteService');
    }

    public async createRemote(externalRemote: RemoteDto): Promise<Remote> {
        this.logger.log(`Creating remote ${externalRemote.url}`);
        const localRemote = this.remoteFactory.dtoToEntity(externalRemote, new Remote());
        return await this.remoteRepository.save(localRemote);
    }

    public async updateRemote(externalRemote: RemoteDto, localRemote: Remote): Promise<Remote> {
        this.logger.log(`Updating remote ${externalRemote.url}`);
        localRemote = this.remoteFactory.dtoToEntity(externalRemote, localRemote);
        return await this.remoteRepository.save(localRemote);
    }

    public async getOrUpdate(settingsRemote: Interfaces.IRemoteConfig): Promise<Remote> {
        const remoteByName = await this.remoteRepository.findOne({ name: settingsRemote.name });
        const remoteByUrl = await this.remoteRepository.findOne({ serverUrl: settingsRemote.url });
        const remote = remoteByName || remoteByUrl;
        if (remote) {
            return await this.updateRemote(settingsRemote, remote);
        } else if (settingsRemote.name) {
            return await this.createRemote(settingsRemote);
        }
    }

    public async synchronize() {
        this.logger.log('-> Starting Remote Synchronization');
        await Promise.all(this
            .dbSyncSettings
            .lxdhubConfig
            .remotes
            .map(async (settingsRemote) => await this.getOrUpdate(settingsRemote)));
        this.logger.log('-> Finished Remote Synchronization');
    }
}
