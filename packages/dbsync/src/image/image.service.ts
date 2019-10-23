import { Image } from '@lxdhub/db';
import { Injectable, Inject, Logger } from '@nestjs/common';
import Aigle from 'aigle';

import { LXDHubDbSyncSettings } from '../dbsync-settings.interface';
import { LXDService } from '../lxd';
import { ImageDtoFactory } from './factories/image-dto.factory';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IRemoteConfig } from '@lxdhub/interfaces';

@Injectable()
export class ImageService {
    private logger: Logger;
    constructor(
        @InjectRepository(Image)
        private imageRepository: Repository<Image>,
        private imageDtoFactory: ImageDtoFactory,
        @Inject('LXDHubDbSyncSettings')
        private dbSyncSettings: LXDHubDbSyncSettings,
        private lxdService: LXDService
    ) {
        this.logger = new Logger('ImageService');
    }

    public async createImage(remoteImage: any): Promise<Image> {
        this.logger.log(`Adding image ${remoteImage.fingerprint}`);
        let localImage: Image = new Image();
        localImage = this.imageDtoFactory.dtoToEntity(remoteImage, localImage);
        await this.imageRepository.save(localImage);
        return localImage;
    }

    public async updateImage(localImage: Image, remoteImage: any): Promise<Image> {
        localImage = this.imageDtoFactory.dtoToEntity(remoteImage, localImage);
        await this.imageRepository.save(localImage);
        return localImage;
    }

    public async updateOrCreateImage(remoteImage: any): Promise<Image> {
        const localImage = await this.getImage(remoteImage);
        // Has Item
        if (localImage) {
            return this.updateImage(localImage, remoteImage);
        } else {
            return this.createImage(remoteImage);
        }
    }

    public async getImage(remoteImage: any): Promise<Image> {
        return await this.imageRepository.findOne({ fingerprint: remoteImage.fingerprint });
    }

    public async synchronize() {
        this.logger.log('-> Starting Image Synchronization');

        Promise.all(this.dbSyncSettings.lxdhubConfig.remotes)
            .catch(err => this.logger.error(err))
            .then(async (remotes: IRemoteConfig[]) => await this.fetchRemotes(remotes));

        this.logger.log('-> Finished Image Synchronization');
    }

    private async fetchRemotes(remotes: IRemoteConfig[]) {
        for (const remote of remotes) {
            Promise.all(await this.lxdService.getRemoteImages(remote))
                .catch(err => this.logger.error(err))
                .then((images: any) => images.forEach(async image => await this.updateOrCreateImage(image)));
        }
    }
}
