import { Image, ImageAvailability, Remote } from '@lxdhub/db';
import { Injectable, Inject, Logger } from '@nestjs/common';
import Aigle from 'aigle';

import { LXDHubDbSyncSettings } from '../dbsync-settings.interface';
import { ImageService } from '../image';
import { LXDService } from '../lxd';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImageAvailabilityService {
    private logger: Logger;
    constructor(
        @InjectRepository(ImageAvailability)
        private repository: Repository<ImageAvailability>,
        @InjectRepository(Remote)
        private remoteRepository: Repository<Remote>,
        @InjectRepository(Image)
        private imageRepository: Repository<Image>,
        private imageService: ImageService,
        @Inject('LXDHubDbSyncSettings')
        private dbSyncSettings: LXDHubDbSyncSettings,
        private lxdService: LXDService
    ) {
        this.logger = new Logger('ImageAvailabilityService');
    }

    async fillUpImageAvailablities() {
        const remotes = await this.remoteRepository.find();
        const images = await this.imageRepository.find();
        for (const remote of remotes) {
            for (const image of images) {
                await this.getOrCreate(image, remote, false);
            }
        }
    }

    async markAsUnavailable(fingerprints: string[], remote: Remote) {
        const imageAvailabilities: ImageAvailability[] = await this.repository
            .find({
                relations: ['image', 'remote'],
                where: {
                    remote: { id: remote.id },
                    available: true,
                }
            });

        const notAvailableImages = imageAvailabilities.filter(ai => fingerprints.indexOf(ai.image.fingerprint) === -1);
        if (notAvailableImages.length === 0) {
            return;
        }
        this.logger.log(`${notAvailableImages.length} images have been removed on the remote "${remote.name}"`);
        await Promise.all(notAvailableImages.map(async imageAvailability => {
            imageAvailability.available = false;
            this.logger.log(`Updating Image Availability to false #${imageAvailability.id} on remote #${remote.id}`);
            return await this.repository.save(imageAvailability);
        }));
    }

    public async updateOrCreate(image: Image, remote: Remote, available: boolean = true): Promise<ImageAvailability> {
        const imageAvailability = await this.get(image, remote);

        if (imageAvailability) {
            imageAvailability.available = available;
            return await this.repository.save(imageAvailability);
        } else {
            return await this.create(image, remote, available);
        }
    }

    private async getOrCreate(image: Image, remote: Remote, available: boolean = true) {
        const iA = await this.get(image, remote);
        if (!iA) {
            return await this.create(image, remote, available);
        }
        return iA;
    }

    private async create(image: Image, remote: Remote, available: boolean = true) {
        this.logger.log(`Creating Image Availability image#${image.id} remote#${remote.id} -> ${available}`);
        const newImageAvailability = new ImageAvailability();
        newImageAvailability.available = available;
        newImageAvailability.image = image;
        newImageAvailability.remote = remote;
        return await this.repository.save(newImageAvailability);
    }

    private async get(image: Image, remote: Remote) {
        return await this.repository.createQueryBuilder('iA')
            .leftJoin('iA.image', 'image')
            .leftJoin('iA.remote', 'remote')
            .where('image.id = :imageId AND remote.id = :remoteId', { imageId: image.id, remoteId: remote.id })
            .getOne();
    }

    async synchronize() {
        this.logger.log('-> Starting image-availability synchronization');
        await Aigle
            .resolve(this.dbSyncSettings.lxdhubConfig.remotes)
            .forEachSeries(async remote => {
                const images = await this.lxdService.getRemoteImages(remote);
                const localRemote = await this.remoteRepository.findOne({ name: remote.name, serverUrl: remote.url });

                await Aigle
                    .resolve(images)
                    .forEachSeries(async remoteImage => {
                        const image = await this.imageService.getImage(remoteImage);
                        return await this.updateOrCreate(image, localRemote);
                    });

                await this.markAsUnavailable(images.map(image => image.fingerprint), localRemote);
            });
        await this.fillUpImageAvailablities();
        this.logger.log('-> Finished image-availability synchronization');
    }
}
