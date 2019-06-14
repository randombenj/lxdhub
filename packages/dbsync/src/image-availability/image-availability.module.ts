import { Module } from '@nestjs/common';

import { ImageModule } from '../image';
import { LXDModule } from '../lxd';
import { RemoteModule } from '../remote';
import { ImageAvailabilityService } from './image-availability.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageAvailability, Remote, Image } from '@lxdhub/db';

@Module({
    imports: [
        RemoteModule,
        ImageModule,
        LXDModule,
        TypeOrmModule.forFeature([ImageAvailability, Remote, Image])
    ],
    providers: [
        ImageAvailabilityService,
    ],
    exports: [
        ImageAvailabilityService
    ]
})
export class ImageAvailabilityModule { }
