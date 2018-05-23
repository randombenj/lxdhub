import { Component, Inject, Logger } from '@nestjs/common';
import { LXD } from 'node-lxd-client';

import { LXDHubDbSyncSettings } from '../dbsync-settings.interface';
import { RemoteDto } from '../remote';

@Component()
export class LXDService {
    private lxd: LXD;
    private logger: Logger;
    private images: any[] = [];

    constructor(
        @Inject('LXDHubDbSyncSettings')
        private dbSyncSettings: LXDHubDbSyncSettings
    ) {
        this.logger = new Logger('LXDService');
    }

    private async getLXDClientConfig(remote: RemoteDto) {
        let config;
        if (remote.password) {
            config = {
                host: remote.url,
                cert: this.dbSyncSettings.lxd.cert,
                key: this.dbSyncSettings.lxd.key,
                password: remote.password
            };
        } else {
            config = { host: remote.url };
        }
        return config;
    }

    private async loadRemoteImages(remote: RemoteDto) {
        const lxdConfig = await this.getLXDClientConfig(remote);
        this.lxd = new LXD(lxdConfig);

        if (remote.password) {
            this.logger.log(`Authorizing certificate for remote ${remote.url}`);
            await this.lxd.authorizeCertificate();
            this.logger.log(`Succesfully authorized certificate for remote ${remote.url}`);
        }

        this.logger.log('Fetching remoteImages');
        const remoteImages: any[] = await this.lxd.image.all(false, true);
        this.logger.log(`Found ${remoteImages.length} images`);

        if (!remoteImages) {
            this.logger.log('No images found on LXD server');
            return;
        }
        return remoteImages;
    }

    public async getRemoteImages(remote: RemoteDto) {
        if (!this.images[remote.name]) {
            this.images[remote.name] = await this.loadRemoteImages(remote);
        }
        return this.images[remote.name];
    }
}
