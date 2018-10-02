import { Module } from '@nestjs/common';

import { ImageModule } from '../image';
import { LXDModule } from '../lxd';
import { RemoteModule } from '../remote';
import { ImageAvailabilityRepository } from './image-availability.repository';
import { ImageAvailabilityService } from './image-availability.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageAvailability } from '@lxdhub/db';

@Module({
    imports: [
        RemoteModule,
        ImageModule,
        LXDModule,
        TypeOrmModule.forFeature([ImageAvailability, ImageAvailabilityRepository])
    ],
    providers: [
        ImageAvailabilityService,
    ],
    exports: [
        ImageAvailabilityService
    ]
})
export class ImageAvailabilityModule { }
