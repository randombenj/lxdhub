import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { ResponseDto } from '@lxdhub/common';
import { CloneStatusDto, ImageDetailDto } from './dtos';
import { Inject } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';

import { ImageAvailabilityService } from '../image-availability/image-availability.service';
import { LogService } from '../log/log.service';
import { LXDService } from '../lxd/lxd.service';
import { RemoteRepository } from '../remote/remote.repository';
import { ImageRepository } from './image.repository';
import { ImageService } from './image.service';

/**
 * Gateway for image related websocket messages
 */
@WebSocketGateway({ namespace: 'image' })
export class ImageGateway {
    logger: LogService;

    /**
     * Initializes the component
     * @param lxdService The LXDService
     * @param remoteRepository The Remote Repository
     */
    constructor(
        private lxdService: LXDService,
        @Inject('RemoteRepository')
        private remoteRepository: RemoteRepository,
        private imageService: ImageService,
        private imageAvailabilityService: ImageAvailabilityService,
        @Inject('ImageRepository')
        private imageRepository: ImageRepository
    ) {
        this.logger = new LogService(this.constructor.name);
    }

    /**
     * Returns the clone status
     * @param data The data sent from the user
     */
    @SubscribeMessage('clone-status')
    public async getCloneStatus(_, data: CloneStatusDto): Promise<WsResponse<ResponseDto<ImageDetailDto>>> {
        // Get remote
        const destinationRemote =
            await this.remoteRepository.findOneItem(data.destinationRemoteId);

        // Wait until cloning is done
        this.logger.log(`Waiting for clone status for remote#${destinationRemote.id} ${destinationRemote.name}:`);
        const response = await this.lxdService.getCloneStatus(destinationRemote, data.operation);
        this.logger.log(`Received clone status for remote#${destinationRemote.id} ${destinationRemote.name}:`);

        // Get the given image
        const image = await this.imageRepository.findOne({ id: data.imageId });

        // Create the image availability
        await this.imageAvailabilityService.getOrCreate(image, destinationRemote, true);

        // Return image detail
        const imageDetail = await this.imageService.findOne(image.id);

        return { data: imageDetail, event: 'clone-status' };
    }
}
