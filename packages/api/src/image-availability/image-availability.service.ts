import { Image, ImageAvailability, Remote } from '@lxdhub/db';
import { InjectRepository } from '@nestjs/typeorm';

import { ImageAvailabilityRepository } from './image-availability.repository';

/**
 * Interface between the Database and API for
 * ImageAvailability operations.
 */
export class ImageAvailabilityService {
    /**
     * Initialized the ImageAvailabilityService.
     * @param imageAvailability The image availability repository
     */
    constructor(
        @InjectRepository(ImageAvailability)
        private readonly imageAvailabilityRepository: ImageAvailabilityRepository,
    ) { }

    /**
     * Creates or returns the image availability entity and updates it
     * @param image The image from the database
     * @param remote The remote from the database
     * @param available If the image is on the given remote available
     */
    async getOrCreate(image: Image, remote: Remote, available: boolean): Promise<ImageAvailability> {
        let imageAvailabilty = await this.imageAvailabilityRepository.getImageByRemoteAndImage(remote.id, image.id);
        if (!imageAvailabilty) {
            // Create a new one
            imageAvailabilty = new ImageAvailability();
            imageAvailabilty.remote = remote;
            imageAvailabilty.image = image;
            imageAvailabilty.available = available;
            imageAvailabilty = await this.imageAvailabilityRepository.create(imageAvailabilty);
        } else {
            // Just update
            imageAvailabilty.available = available;
            imageAvailabilty = await this.imageAvailabilityRepository.save(imageAvailabilty);
        }
        return imageAvailabilty;
    }
}
