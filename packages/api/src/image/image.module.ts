import { Module } from '@nestjs/common';

import { ImageAvailabilityModule } from '../image-availability/';
import { LogModule } from '../log';
import { LXDModule } from '../lxd';
import { RemoteModule } from '../remote';
import { SearchModule } from '../search/search.module';
import { ImageDetailFactory, ImageListItemFactory } from './factories';
import { ImageSearchDictionaryProvider } from './image-search-dictionary.const';
import { ImageController } from './image.controller';
import { ImageGateway } from './image.gateway';
import { ImageRepository } from './image.repository';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '@lxdhub/db';

@Module({
  imports: [
    SearchModule,
    LXDModule,
    RemoteModule,
    ImageAvailabilityModule,
    LogModule,
    TypeOrmModule.forFeature([Image, ImageRepository])
  ],
  controllers: [ImageController],
  providers: [
    ImageGateway,
    ImageService,
    ImageListItemFactory,
    ImageDetailFactory,
    ImageSearchDictionaryProvider,
  ]
})
/**
 * The Image module, which bundles all
 * operational or processable image related
 * modules, controllers and components
 */
export class ImageModule { }
