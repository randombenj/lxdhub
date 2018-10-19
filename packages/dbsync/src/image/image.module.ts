import { Module, Global } from '@nestjs/common';

import { ImageService } from './image.service';
import { LXDModule } from '../lxd';
import { ImageDtoFactory } from './factories';
import { ImageRepository } from './image.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '@lxdhub/db';

@Module({
    imports: [
        LXDModule,
        TypeOrmModule.forFeature([Image, ImageRepository])
    ],
    providers: [
        ImageService,
        ImageDtoFactory
    ],
    exports: [
        ImageService,
    ]
})
@Global()
export class ImageModule { }
